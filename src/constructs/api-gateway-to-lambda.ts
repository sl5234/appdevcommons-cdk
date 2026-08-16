import { Duration } from 'aws-cdk-lib';
import { AuthorizationType, LambdaIntegration, RestApi, TokenAuthorizer } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function as LambdaFunction, Runtime, RuntimeFamily } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

/**
 * API Gateway's REST API integration timeout is hard-capped at 29 seconds
 * and cannot be raised, regardless of the Lambda function's own timeout.
 */
const MAX_API_GATEWAY_TIMEOUT = Duration.seconds(29);

const DEFAULT_AUTHORIZER_TIMEOUT = Duration.seconds(10);

/**
 * Points this construct at a Lambda handler's code. Shared by the main API
 * handler and the optional Lambda authorizer, since both are built the same way.
 */
export interface LambdaProps {
  /**
   * Path to the Lambda handler code.
   *
   * For Node.js runtimes, this is a single entry file (e.g. `path.join(__dirname, 'handler.ts')`),
   * bundled automatically with esbuild.
   *
   * For Python runtimes, this is a directory containing the handler module and any
   * already-vendored dependencies. No automatic `pip install` bundling is performed;
   * vendor dependencies into this directory or attach a Lambda Layer.
   */
  readonly entry: string;

  /**
   * The Lambda handler to invoke.
   *
   * For Node.js runtimes, this is the exported function name within `entry`.
   * For Python runtimes, this is the standard `module.function` handler string (e.g. `'index.handler'`).
   *
   * @default 'handler' for Node.js, 'index.handler' for Python
   */
  readonly handler?: string;

  /**
   * Lambda runtime. Node.js and Python runtimes are supported.
   * @default Runtime.NODEJS_20_X
   */
  readonly runtime?: Runtime;

  /**
   * Lambda memory size, in MB.
   * @default 512
   */
  readonly memorySize?: number;

  /**
   * Lambda timeout.
   * @default Duration.seconds(29) for the main handler, Duration.seconds(10) for an authorizer
   */
  readonly timeout?: Duration;

  /**
   * Environment variables passed to the Lambda function. Avoid putting secrets here
   * directly — pass a reference instead (e.g. a Secrets Manager ARN) and resolve the
   * real value at runtime, since plain environment variables are visible in the
   * Lambda console and the CloudFormation template.
   */
  readonly environment?: { [key: string]: string };
}

export interface TokenAuthProps {
  /**
   * The Lambda authorizer function's code, built the same way (Node.js or Python)
   * as the main handler.
   */
  readonly lambdaProps: LambdaProps;

  /**
   * Where the authorizer reads the caller's bearer token from.
   * @default 'method.request.header.Authorization'
   */
  readonly identitySource?: string;
}

export interface ApiGatewayToLambdaProps {
  /**
   * The main Lambda function backing the API.
   */
  readonly lambdaProps: LambdaProps;

  /**
   * When provided, puts a Lambda-backed TokenAuthorizer in front of the API, built
   * from this code. Use this when callers aren't AWS principals you control (e.g.
   * public app users) and you have your own logic for identifying them from a
   * single bearer token/header.
   * @default no authorization (public, unauthenticated)
   */
  readonly authProps?: TokenAuthProps;
}

/**
 * API Gateway REST API backed by a single Lambda function, proxying all
 * requests through to the handler. The consuming app supplies its own
 * handler code via `lambdaProps.entry`; both Node.js and Python runtimes
 * are supported. Optionally builds a Lambda authorizer the same way.
 */
export class ApiGatewayToLambda extends Construct {
  public readonly api: RestApi;
  public readonly handlerFunction: LambdaFunction;
  public readonly authorizerFunction?: LambdaFunction;

  constructor(scope: Construct, id: string, props: ApiGatewayToLambdaProps) {
    super(scope, id);

    const runtime = props.lambdaProps.runtime ?? Runtime.NODEJS_20_X;
    const timeout = props.lambdaProps.timeout ?? MAX_API_GATEWAY_TIMEOUT;
    if (timeout.toSeconds() > MAX_API_GATEWAY_TIMEOUT.toSeconds()) {
      throw new Error(
        `ApiGatewayToLambda timeout must be <= ${MAX_API_GATEWAY_TIMEOUT.toSeconds()} seconds because of the ` +
        `API Gateway REST API integration limit (got ${timeout.toSeconds()}s). ` +
        'Use a streaming Lambda Function URL for longer-running calls.',
      );
    }

    this.handlerFunction = createHandlerFunction(this, 'Handler', props.lambdaProps, runtime, timeout);

    const authorizer = props.authProps ? this.buildAuthorizer(props.authProps) : undefined;
    this.authorizerFunction = authorizer?.authorizerFunction;

    this.api = new RestApi(this, 'Api', {
      restApiName: `${id}-api`,
    });

    this.api.root.addProxy({
      defaultIntegration: new LambdaIntegration(this.handlerFunction),
      anyMethod: true,
      defaultMethodOptions: {
        authorizationType: authorizer ? AuthorizationType.CUSTOM : AuthorizationType.NONE,
        authorizer: authorizer?.tokenAuthorizer,
      },
    });
  }

  private buildAuthorizer(authProps: TokenAuthProps): { authorizerFunction: LambdaFunction; tokenAuthorizer: TokenAuthorizer } {
    const { lambdaProps } = authProps;
    const runtime = lambdaProps.runtime ?? Runtime.NODEJS_20_X;
    const timeout = lambdaProps.timeout ?? DEFAULT_AUTHORIZER_TIMEOUT;
    const authorizerFunction = createHandlerFunction(this, 'Authorizer', lambdaProps, runtime, timeout);
    const tokenAuthorizer = new TokenAuthorizer(this, 'TokenAuthorizer', {
      handler: authorizerFunction,
      identitySource: authProps.identitySource,
    });
    return { authorizerFunction, tokenAuthorizer };
  }
}

function createHandlerFunction(
  scope: Construct,
  id: string,
  props: LambdaProps,
  runtime: Runtime,
  timeout: Duration,
): LambdaFunction {
  switch (runtime.family) {
    case RuntimeFamily.NODEJS:
      return createNodejsHandlerFunction(scope, id, props, runtime, timeout);
    case RuntimeFamily.PYTHON:
      return createPythonHandlerFunction(scope, id, props, runtime, timeout);
    default:
      throw new Error(
        `ApiGatewayToLambda only supports Node.js and Python runtimes (got ${runtime.name}).`,
      );
  }
}

function createNodejsHandlerFunction(
  scope: Construct,
  id: string,
  props: LambdaProps,
  runtime: Runtime,
  timeout: Duration,
): NodejsFunction {
  return new NodejsFunction(scope, id, {
    entry: props.entry,
    handler: props.handler ?? 'handler',
    runtime,
    memorySize: props.memorySize ?? 512,
    timeout,
    environment: props.environment,
  });
}

function createPythonHandlerFunction(
  scope: Construct,
  id: string,
  props: LambdaProps,
  runtime: Runtime,
  timeout: Duration,
): LambdaFunction {
  return new LambdaFunction(scope, id, {
    code: Code.fromAsset(props.entry),
    handler: props.handler ?? 'index.handler',
    runtime,
    memorySize: props.memorySize ?? 512,
    timeout,
    environment: props.environment,
  });
}

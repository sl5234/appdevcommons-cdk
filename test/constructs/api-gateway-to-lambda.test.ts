import * as path from 'path';
import { App, Duration, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { ApiGatewayToLambda } from '../../src';

const nodeFixtureEntry = path.join(__dirname, 'fixtures', 'handler.ts');
const pythonFixtureEntry = path.join(__dirname, 'fixtures', 'python');

test('defaults to a Node.js runtime, bundling the given entry file', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');

  new ApiGatewayToLambda(stack, 'TestConstruct', {
    lambdaProps: { entry: nodeFixtureEntry },
  });

  const template = Template.fromStack(stack);
  template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
  template.resourceCountIs('AWS::Lambda::Function', 1);
  template.hasResourceProperties('AWS::Lambda::Function', {
    Handler: 'index.handler',
    Runtime: 'nodejs20.x',
    Timeout: 29,
  });
});

test('supports a Python runtime, zipping the given entry directory', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');

  new ApiGatewayToLambda(stack, 'TestConstruct', {
    lambdaProps: { entry: pythonFixtureEntry, runtime: Runtime.PYTHON_3_13 },
  });

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::Lambda::Function', {
    Handler: 'index.handler',
    Runtime: 'python3.13',
  });
});

test('throws for an unsupported runtime family', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');

  expect(
    () =>
      new ApiGatewayToLambda(stack, 'TestConstruct', {
        lambdaProps: { entry: pythonFixtureEntry, runtime: Runtime.JAVA_21 },
      }),
  ).toThrow(/only supports Node\.js and Python runtimes/);
});

test('throws when timeout exceeds the API Gateway integration limit', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');

  expect(
    () =>
      new ApiGatewayToLambda(stack, 'TestConstruct', {
        lambdaProps: { entry: nodeFixtureEntry, timeout: Duration.seconds(30) },
      }),
  ).toThrow(/29 seconds/);
});

test('defaults to no authorization', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');

  new ApiGatewayToLambda(stack, 'TestConstruct', {
    lambdaProps: { entry: nodeFixtureEntry },
  });

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    AuthorizationType: 'NONE',
  });
});

test('builds and wires a Lambda token authorizer when provided', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');

  const construct = new ApiGatewayToLambda(stack, 'TestConstruct', {
    lambdaProps: { entry: nodeFixtureEntry },
    authProps: {
      lambdaProps: { entry: nodeFixtureEntry },
    },
  });

  expect(construct.authorizerFunction).toBeDefined();

  const template = Template.fromStack(stack);
  template.resourceCountIs('AWS::Lambda::Function', 2);
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    AuthorizationType: 'CUSTOM',
  });
  template.hasResourceProperties('AWS::ApiGateway::Authorizer', {
    Type: 'TOKEN',
  });
});

test('supports a Python Lambda authorizer', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');

  new ApiGatewayToLambda(stack, 'TestConstruct', {
    lambdaProps: { entry: nodeFixtureEntry },
    authProps: {
      lambdaProps: { entry: pythonFixtureEntry, runtime: Runtime.PYTHON_3_13 },
    },
  });

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::Lambda::Function', {
    Handler: 'index.handler',
    Runtime: 'python3.13',
    Timeout: 10,
  });
});

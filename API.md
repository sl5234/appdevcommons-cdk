# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ApiGatewayToLambda <a name="ApiGatewayToLambda" id="appdevcommons-cdk.ApiGatewayToLambda"></a>

API Gateway REST API backed by a single Lambda function, proxying all requests through to the handler.

The consuming app supplies its own
handler code via `lambdaProps.entry`; both Node.js and Python runtimes
are supported. Optionally builds a Lambda authorizer the same way.

#### Initializers <a name="Initializers" id="appdevcommons-cdk.ApiGatewayToLambda.Initializer"></a>

```typescript
import { ApiGatewayToLambda } from 'appdevcommons-cdk'

new ApiGatewayToLambda(scope: Construct, id: string, props: ApiGatewayToLambdaProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#appdevcommons-cdk.ApiGatewayToLambda.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#appdevcommons-cdk.ApiGatewayToLambda.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#appdevcommons-cdk.ApiGatewayToLambda.Initializer.parameter.props">props</a></code> | <code><a href="#appdevcommons-cdk.ApiGatewayToLambdaProps">ApiGatewayToLambdaProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="appdevcommons-cdk.ApiGatewayToLambda.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="appdevcommons-cdk.ApiGatewayToLambda.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="appdevcommons-cdk.ApiGatewayToLambda.Initializer.parameter.props"></a>

- *Type:* <a href="#appdevcommons-cdk.ApiGatewayToLambdaProps">ApiGatewayToLambdaProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#appdevcommons-cdk.ApiGatewayToLambda.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#appdevcommons-cdk.ApiGatewayToLambda.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="appdevcommons-cdk.ApiGatewayToLambda.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="appdevcommons-cdk.ApiGatewayToLambda.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="appdevcommons-cdk.ApiGatewayToLambda.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#appdevcommons-cdk.ApiGatewayToLambda.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="appdevcommons-cdk.ApiGatewayToLambda.isConstruct"></a>

```typescript
import { ApiGatewayToLambda } from 'appdevcommons-cdk'

ApiGatewayToLambda.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="appdevcommons-cdk.ApiGatewayToLambda.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#appdevcommons-cdk.ApiGatewayToLambda.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#appdevcommons-cdk.ApiGatewayToLambda.property.api">api</a></code> | <code>aws-cdk-lib.aws_apigateway.RestApi</code> | *No description.* |
| <code><a href="#appdevcommons-cdk.ApiGatewayToLambda.property.handlerFunction">handlerFunction</a></code> | <code>aws-cdk-lib.aws_lambda.Function</code> | *No description.* |
| <code><a href="#appdevcommons-cdk.ApiGatewayToLambda.property.authorizerFunction">authorizerFunction</a></code> | <code>aws-cdk-lib.aws_lambda.Function</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="appdevcommons-cdk.ApiGatewayToLambda.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `api`<sup>Required</sup> <a name="api" id="appdevcommons-cdk.ApiGatewayToLambda.property.api"></a>

```typescript
public readonly api: RestApi;
```

- *Type:* aws-cdk-lib.aws_apigateway.RestApi

---

##### `handlerFunction`<sup>Required</sup> <a name="handlerFunction" id="appdevcommons-cdk.ApiGatewayToLambda.property.handlerFunction"></a>

```typescript
public readonly handlerFunction: Function;
```

- *Type:* aws-cdk-lib.aws_lambda.Function

---

##### `authorizerFunction`<sup>Optional</sup> <a name="authorizerFunction" id="appdevcommons-cdk.ApiGatewayToLambda.property.authorizerFunction"></a>

```typescript
public readonly authorizerFunction: Function;
```

- *Type:* aws-cdk-lib.aws_lambda.Function

---


## Structs <a name="Structs" id="Structs"></a>

### ApiGatewayToLambdaProps <a name="ApiGatewayToLambdaProps" id="appdevcommons-cdk.ApiGatewayToLambdaProps"></a>

#### Initializer <a name="Initializer" id="appdevcommons-cdk.ApiGatewayToLambdaProps.Initializer"></a>

```typescript
import { ApiGatewayToLambdaProps } from 'appdevcommons-cdk'

const apiGatewayToLambdaProps: ApiGatewayToLambdaProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#appdevcommons-cdk.ApiGatewayToLambdaProps.property.lambdaProps">lambdaProps</a></code> | <code><a href="#appdevcommons-cdk.LambdaProps">LambdaProps</a></code> | The main Lambda function backing the API. |
| <code><a href="#appdevcommons-cdk.ApiGatewayToLambdaProps.property.authProps">authProps</a></code> | <code><a href="#appdevcommons-cdk.TokenAuthProps">TokenAuthProps</a></code> | When provided, puts a Lambda-backed TokenAuthorizer in front of the API, built from this code. |

---

##### `lambdaProps`<sup>Required</sup> <a name="lambdaProps" id="appdevcommons-cdk.ApiGatewayToLambdaProps.property.lambdaProps"></a>

```typescript
public readonly lambdaProps: LambdaProps;
```

- *Type:* <a href="#appdevcommons-cdk.LambdaProps">LambdaProps</a>

The main Lambda function backing the API.

---

##### `authProps`<sup>Optional</sup> <a name="authProps" id="appdevcommons-cdk.ApiGatewayToLambdaProps.property.authProps"></a>

```typescript
public readonly authProps: TokenAuthProps;
```

- *Type:* <a href="#appdevcommons-cdk.TokenAuthProps">TokenAuthProps</a>
- *Default:* no authorization (public, unauthenticated)

When provided, puts a Lambda-backed TokenAuthorizer in front of the API, built from this code.

Use this when callers aren't AWS principals you control (e.g.
public app users) and you have your own logic for identifying them from a
single bearer token/header.

---

### LambdaProps <a name="LambdaProps" id="appdevcommons-cdk.LambdaProps"></a>

Points this construct at a Lambda handler's code.

Shared by the main API
handler and the optional Lambda authorizer, since both are built the same way.

#### Initializer <a name="Initializer" id="appdevcommons-cdk.LambdaProps.Initializer"></a>

```typescript
import { LambdaProps } from 'appdevcommons-cdk'

const lambdaProps: LambdaProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#appdevcommons-cdk.LambdaProps.property.entry">entry</a></code> | <code>string</code> | Path to the Lambda handler code. |
| <code><a href="#appdevcommons-cdk.LambdaProps.property.environment">environment</a></code> | <code>{[ key: string ]: string}</code> | Environment variables passed to the Lambda function. |
| <code><a href="#appdevcommons-cdk.LambdaProps.property.handler">handler</a></code> | <code>string</code> | The Lambda handler to invoke. |
| <code><a href="#appdevcommons-cdk.LambdaProps.property.memorySize">memorySize</a></code> | <code>number</code> | Lambda memory size, in MB. |
| <code><a href="#appdevcommons-cdk.LambdaProps.property.runtime">runtime</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime</code> | Lambda runtime. |
| <code><a href="#appdevcommons-cdk.LambdaProps.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | Lambda timeout. |

---

##### `entry`<sup>Required</sup> <a name="entry" id="appdevcommons-cdk.LambdaProps.property.entry"></a>

```typescript
public readonly entry: string;
```

- *Type:* string

Path to the Lambda handler code.

For Node.js runtimes, this is a single entry file (e.g. `path.join(__dirname, 'handler.ts')`),
bundled automatically with esbuild.

For Python runtimes, this is a directory containing the handler module and any
already-vendored dependencies. No automatic `pip install` bundling is performed;
vendor dependencies into this directory or attach a Lambda Layer.

---

##### `environment`<sup>Optional</sup> <a name="environment" id="appdevcommons-cdk.LambdaProps.property.environment"></a>

```typescript
public readonly environment: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Environment variables passed to the Lambda function.

Avoid putting secrets here
directly — pass a reference instead (e.g. a Secrets Manager ARN) and resolve the
real value at runtime, since plain environment variables are visible in the
Lambda console and the CloudFormation template.

---

##### `handler`<sup>Optional</sup> <a name="handler" id="appdevcommons-cdk.LambdaProps.property.handler"></a>

```typescript
public readonly handler: string;
```

- *Type:* string
- *Default:* 'handler' for Node.js, 'index.handler' for Python

The Lambda handler to invoke.

For Node.js runtimes, this is the exported function name within `entry`.
For Python runtimes, this is the standard `module.function` handler string (e.g. `'index.handler'`).

---

##### `memorySize`<sup>Optional</sup> <a name="memorySize" id="appdevcommons-cdk.LambdaProps.property.memorySize"></a>

```typescript
public readonly memorySize: number;
```

- *Type:* number
- *Default:* 512

Lambda memory size, in MB.

---

##### `runtime`<sup>Optional</sup> <a name="runtime" id="appdevcommons-cdk.LambdaProps.property.runtime"></a>

```typescript
public readonly runtime: Runtime;
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime
- *Default:* Runtime.NODEJS_20_X

Lambda runtime.

Node.js and Python runtimes are supported.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="appdevcommons-cdk.LambdaProps.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.seconds(29) for the main handler, Duration.seconds(10) for an authorizer

Lambda timeout.

---

### TokenAuthProps <a name="TokenAuthProps" id="appdevcommons-cdk.TokenAuthProps"></a>

#### Initializer <a name="Initializer" id="appdevcommons-cdk.TokenAuthProps.Initializer"></a>

```typescript
import { TokenAuthProps } from 'appdevcommons-cdk'

const tokenAuthProps: TokenAuthProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#appdevcommons-cdk.TokenAuthProps.property.lambdaProps">lambdaProps</a></code> | <code><a href="#appdevcommons-cdk.LambdaProps">LambdaProps</a></code> | The Lambda authorizer function's code, built the same way (Node.js or Python) as the main handler. |
| <code><a href="#appdevcommons-cdk.TokenAuthProps.property.identitySource">identitySource</a></code> | <code>string</code> | Where the authorizer reads the caller's bearer token from. |

---

##### `lambdaProps`<sup>Required</sup> <a name="lambdaProps" id="appdevcommons-cdk.TokenAuthProps.property.lambdaProps"></a>

```typescript
public readonly lambdaProps: LambdaProps;
```

- *Type:* <a href="#appdevcommons-cdk.LambdaProps">LambdaProps</a>

The Lambda authorizer function's code, built the same way (Node.js or Python) as the main handler.

---

##### `identitySource`<sup>Optional</sup> <a name="identitySource" id="appdevcommons-cdk.TokenAuthProps.property.identitySource"></a>

```typescript
public readonly identitySource: string;
```

- *Type:* string
- *Default:* 'method.request.header.Authorization'

Where the authorizer reads the caller's bearer token from.

---




import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Sangmin Lee',
  authorAddress: 'smin.lee5234@gmail.com',
  cdkVersion: '2.189.1',
  jsiiVersion: '~6.0.0',
  name: 'appdevcommons-cdk',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/sl5234/appdevcommons-cdk.git',

  defaultReleaseBranch: 'main',
  description: 'Shared CDK constructs for deploying common app infrastructure across AWS accounts',
  // deps: [],                      /* Runtime dependencies of this module. */
  devDeps: ['esbuild'], /* needed to bundle NodejsFunction constructs during local build/test */
  // packageName: undefined,        /* The "name" in package.json. */
  docgen: false, /* API.md is redundant with TS types/JSDoc for a small library */

  // Publish via npm Trusted Publishing (OIDC) instead of a long-lived NPM_TOKEN secret.
  // Needs to be configured on npmjs.com for this repo/workflow first.
  npmTrustedPublishing: true,
});
project.synth();
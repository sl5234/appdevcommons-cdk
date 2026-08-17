# appdevcommons-cdk

Shared CDK constructs for deploying common app infrastructure across AWS accounts.

## Publishing to npm

Publishing is currently manual (no CI auto-publish is wired up). One-time setup: save an
npm access token to your global `~/.npmrc` so `npm publish` doesn't need a token pasted
into every command:

```
npm config set //registry.npmjs.org/:_authToken=<your-token>
```

To release a new version, from the repo root:

```
BUMP_TYPE=patch npx projen bump      # or minor/major, depending on the change
npx projen compile
npx projen test
npx projen package:js
npm publish ./dist/js/appdevcommons-cdk@<new-version>.jsii.tgz
npx projen unbump                    # resets package.json back to 0.0.0 (repo convention)
```

(swap `<new-version>` for whatever `bump` printed, and `<your-token>` for a value from
npmjs.com → Access Tokens → Generate New Token → Granular Access Token)

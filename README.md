# TypeScript Module Template

This is a template for creating a npm module written in TypeScript.

## Usage

Just click the "Use this template" button and create a new repository.

## Initialization

1. Change these lines in `package.json`:
    ```json
    {
    "keywords": ["your", "keywords", "<"],
    "description": "Your module description here <",
    "license": "Your license here <",
    ```
2. Change the `README.md` file to your needs.
3. Add LICENSE file if you want to.

## `engines` field in `package.json`

### `node`

You can specify a node version in this field. We'll use this version to set up the CI environment.

### `npm` / `yarn` / `pnpm`

You can specify a package manager in this field. We'll use this package manager to install dependencies.

### The compatibility of `esm` & `cjs`

There's no need to do some additional work to make the module compatible with `esm` and `cjs` environments.
Your module will work in both environments without any additional configuration.

## Project Structure

Just like a normal TypeScript project, but with a `src` folder.
We use [mocha](https://mochajs.org/) for testing, all test files should be ended with `.spec.ts`.

```
src/
  index.ts
  your-module.ts
  your-module.spec.ts
```

## Publishing to npm

Generate a new npm token and add it to the repository secrets as `NPM_TOKEN`. Then, create a new release and the CI will automatically publish the package to npm.

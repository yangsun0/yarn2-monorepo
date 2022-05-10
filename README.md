# yarn2-monorepo

### 0. check yarn version

```
yarn -v

1.22.15
```

### 1. Initialize the project

```
yarn init -2 -p -w
yarn -v

3.2.0
```

### 2. Setup editor

```
yarn add -D typescript
yarn add -D prettier
yarn add -D eslint
yarn dlx @yarnpkg/sdks vscode

➤ YN0000: ┌ Generating SDKs inside .yarn/sdks
➤ YN0000: │ ✓ Eslint
➤ YN0000: │ ✓ Prettier
➤ YN0000: │ ✓ Typescript
➤ YN0000: │ • 3 SDKs were skipped based on your root dependencies
➤ YN0000: └ Completed
➤ YN0000: ┌ Generating settings
➤ YN0000: │ ✓ Vscode (new ✨)
➤ YN0000: └ Completed
```

### 3. Setup VSCode

VSCode:

- Typescript: Select Typescript version...
- Use Workspace Version

```json
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
```

### 4. create-react-app

```
yarn create react-app web --template typescript
```

### 5. Fix broken react-app

Resolution errors:

```
yarn install

➤ YN0000: ┌ Resolution step
➤ YN0002: │ eslint-config-react-app@npm:7.0.1 [9fb2f] doesn't provide @babel/plugin-syntax-flow (pd9ab0), requested by eslint-plugin-flowtype
➤ YN0002: │ eslint-config-react-app@npm:7.0.1 [9fb2f] doesn't provide @babel/plugin-transform-react-jsx (pa26dc), requested by eslint-plugin-flowtype
➤ YN0002: │ react-dev-utils@npm:12.0.1 doesn't provide typescript (p59348), requested by fork-ts-checker-webpack-plugin
➤ YN0002: │ react-dev-utils@npm:12.0.1 doesn't provide webpack (p1012e), requested by fork-ts-checker-webpack-plugin
➤ YN0002: │ web@workspace:packages/web doesn't provide @testing-library/dom (p30799), requested by @testing-library/user-event
➤ YN0000: │ Some peer dependencies are incorrectly met; run yarn explain peer-requirements <hash> for details, where <hash> is the six-letter p-prefixed code
➤ YN0000: └ Completed in 0s 226ms
➤ YN0000: ┌ Fetch step
➤ YN0000: └ Completed in 0s 242ms
➤ YN0000: ┌ Link step
➤ YN0000: │ ESM support for PnP uses the experimental loader API and is therefore experimental
➤ YN0000: └ Completed
➤ YN0000: Done with warnings in 0s 745ms
```

Fix in .yanrc.yml

```yml
packageExtensions:
  # awaiting fix: https://github.com/facebook/create-react-app/issues/11982
  "eslint-plugin-flowtype@*":
    peerDependenciesMeta:
      "@babel/plugin-syntax-flow":
        optional: true
      "@babel/plugin-transform-react-jsx":
        optional: true

  # awaiting fix: https://github.com/facebook/create-react-app/pull/11526
  "react-dev-utils@*":
    peerDependencies:
      "typescript": ">=2.7"
      "webpack": ">=4"
```

```
yarn add @testing-library/dom
```

Build failed, caused by "eslint-config-react-app"

```
yarn build
Creating an optimized production build...
Failed to compile.

Failed to load config "react-app" to extend from.
Referenced from: .../yarn2-monorepo/packages/web/package.json
```

Fix in package.json, remove the extends of eslintConfig

```json
  "eslintConfig": {
    "extends": []
  },
```

Build test failed

```
yarn build
Creating an optimized production build...
Failed to compile.

TS2339: Property 'toBeInTheDocument' does not exist on type 'JestMatchers<HTMLElement>'.
     6 |   render(<App />);
     7 |   const linkElement = screen.getByText(/learn react/i);
  >  8 |   expect(linkElement).toBeInTheDocument();
       |                       ^^^^^^^^^^^^^^^^^
     9 | });
    10 |
```

Fix

```
yarn add @types/testing-library__jest-dom
```

test doesn't run

Fix:

```json
  "scripts": {
    "test": "react-scripts test --runInBand",
  },
```

### 6. Share code in workspace

```bash
cd packages/common
yarn init -p
yarn run tsc --init
yarn run eslint --init
cd packages/web
yarn add common
```

web/package.json

```json
  "dependencies": {
    //...
    "common": "workspace:^",
  },
```

### 7. import yarn plugins

```shell
yarn plugin import typescript
yarn plugin import workspace-tools
```

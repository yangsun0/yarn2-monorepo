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

### 3. VSCode auto save

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

# @mocoding/react-app

> Bootstrap and Build System for React Web Application. Batteries included.


## Getting started

Create `package.json` with the following content:

```json
{
  "name": "example",  
  "devDependencies": {
    "@mocoding/react-app": "*",    
  },  
  "scripts": {
    "start": "moapp serve",    
    "build": "moapp build -p"
  },
  "eslintConfig": {
    "extends": "@mocoding/eslint-config"
  },
  "prettier": "@mocoding/eslint-config/prettier"
}
```

Add `index.tsx` to the root.

```tsx
import * as React from "react";

export class App extends React.Component {
  public render(): JSX.Element {
    return <div>Hello World</div>;
  }
}
```

Add `tsconfig.json`

```json
{
  "extends": "@mocoding/react-app-common/tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": "."
  }
}
```

Test the code:

```sh
# Restore dependencies
> yarn
# Test application in development with HMR
> yarn start
# Build application for production
> yarn build
```

## Details

Check project [github](https://github.com/mocoding-software/react-app) for more documentation about this module.

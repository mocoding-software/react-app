<div align="center">
  <a href="https://github.com/mocoding-software/react-app">
    <img src="https://raw.githubusercontent.com/mocoding-software/react-app/master/icon.png">
  </a>
  <br>
  <br>
</div>

[![npm][npm-image]][npm-url]
[![deps][deps]][deps-url]
# Mocoding Stack - React Web Application

The goal of this library to ensure consistent friendly **development experience** (like Hot-Module-Replacment) combined with with **deployment best practices** (like bundling and minification, SSR etc) + **avoid copy-paste** of configuration and bootstrap files. So this is a monorepo that contains build tools, common configuration and bootstrap logic for React web application. We are using these shared libraries to follow **DRY** principle in every application we build. 

## Gettings started:

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
# Test application in development with HMR (http://localhost:3000)
> yarn start
# Build application for production
> yarn build
```

## Details

### CLI & Options

When run utility without any command - help is displayed.
```
$ moapp
Usage: moapp [options] [command]

Mocoding React Web Application

Options:
  -V, --version        output the version number
  -p, --production     build for production (default: false)
  -a, --analyze        enable bundle analyzer (default: false)
  -c, --config [path]  custom path to configuration file
  -h, --help           display help for command

Commands:
  build                Build Application
  config               Display Webpack configuration
  serve                Start development server
  help [command]       display help for command
```

The library uses [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) to locate configuration so it will look for any of these:
- a `package.json` property named `moapp`
- a `.moapprc` file in JSON or YAML format
- a `.moapprc.json` file
- a `.moapprc.yaml`, `.moapprc.yml`, or `.moapprc.js` file
- a `moapp.config.js` file exporting a JS object
- `path` when specified using `--config` option

Default Configuration (see `packages/react-app/src/cli/options.ts`):
```json
{
  "appEntry": ".",
  "bootstrapModule": "@mocoding/react-app-basic",
  "outputClientPath": "./wwwroot",
  "outputServerPath": "./wwwroot_node",
}
```

* `appEntry` - root of the application. It is rquired to have non-default export named `App` be present at the root.
* `bootstrapModule` - one the bootstrap modules see [packages](#packages) for details.
* `outputClientPath` - public directory with client (browser only) files
* `outputServerPath` - directory with server (node only) files used for SSR

### Build System

[Webpack](https://github.com/webpack/webpack) is the core of the build system. It allows creating server and client configiguration with the following rules enabled:

**Client**
- typescript for `ts` and `tsx`
- styles for `css` and `sass` (transformed into `styles.css`)
- fonts - `eot`, `ttf`, `otf`, `woff`, `woff2`, `svg` (copied to "./wwwroot/fonts`)
- images - `png`, `jpg`, `gif` (copied to "./wwwroot/images`)
- favicon - `ico` - copied in the root of the project.

**Server**:
- typescript for `ts` and `tsx`
- ignore styles, fonts, imgaes and icons.

### Packages

* `@mocoding/eslint-config` - comon `eslint` and `prettier` configuration.
* `@mocoding/react-app` - cli and build tools.
* `@mocoding/react-app-common` - common application files. 
* `@mocoding/react-app-basic` - boilerplate files to create static single page websites.
* `@mocoding/react-app-router-redux` - boilerplate files to create state-driven websites with several pages.
* `@mocoding/react-app-router-redux-async` - boilerplate files to create websites that use APIs to manipulate the state.

License
=======

[The MIT License](https://raw.githubusercontent.com/mocoding-software/react-app/master/LICENSE)

COPYRIGHT (C) 2020 MOCODING, LLC

[npm-image]: https://img.shields.io/npm/v/@mocoding/react-app.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@mocoding/react-app

[deps]: https://img.shields.io/david/mocoding-software/react-app.svg
[deps-url]: https://david-dm.org/mocoding-software/react-app

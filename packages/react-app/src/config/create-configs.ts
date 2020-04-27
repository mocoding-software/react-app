import program from "commander";
import * as fs from "fs";
import * as path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import { createWebConfig } from "./create-web-config";
import { createServerConfig } from "./create-server-config";
import { Settings } from "./settings";

export function createConfigs(settings: Settings): webpack.Configuration[] {
  // Defaults:
  // projectRoot - root of the project (project.json location)
  // appRoot - application main directory
  // outputPath - build directory
  // outputPathServer - build directory
  // clientEntryPoint - entry point for client (browser) side
  // serverEntryPoint - entry point for server side (development only).
  // ssrEntryPoint - entry point for render function.
  const projectRootPath = process.cwd();
  const appRoot = path.join(projectRootPath, settings.appModule);
  const outputPath = path.join(projectRootPath, settings.outputClientPath);
  const outputPathServer = path.join(projectRootPath, settings.outputServerPath);
  const tsConfigLocation = path.join(__dirname, "../../../react-app-common/tsconfig.base.json");
  const clientEntryPoint = "@mocoding/react-app-common/lib/client";
  const serverEntryPoint = "@mocoding/react-app-common/lib/server";
  const devServerEntryPoint = path.join(__dirname, "../dev-server");
  const devEntries = program.production ? [] : ["webpack-hot-middleware/client", "react-hot-loader/patch"];

  // client & server
  const client: webpack.Entry = {
    index: [...devEntries, clientEntryPoint],
  };

  const server: webpack.Entry = {
    server: program.production ? serverEntryPoint : devServerEntryPoint,
  };

  // Creating configs
  let clientConfig = createWebConfig(tsConfigLocation, client, outputPath, program.production);

  let serverConfig = createServerConfig(tsConfigLocation, server, outputPathServer, program.production);

  // Adding default plugin
  const definePlugin = new webpack.DefinePlugin({
    "process.env": {
      API_URL: JSON.stringify(settings.devApiUrl),
      NODE_ENV: JSON.stringify(program.production ? "production" : "development"),
      SCRIPTS_TYPE: JSON.stringify(settings.type),
    },
  });

  clientConfig.plugins?.push(definePlugin);
  serverConfig.plugins?.push(definePlugin);

  const configs = [clientConfig, serverConfig];

  // adding aliases for hot reload
  if (!program.production) {
    inject(configs, "react-dom", "@hot-loader/react-dom");
  }

  // entry points
  // const bootstrapEntryPoint = path.join(
  //   settings.bootstrapModule,
  //   `@mocoding/react-app-common/entry/index.${program.production ? "prod" : "dev"}.ts`,
  // );

  inject(configs, "injected-bootstrap-module", settings.bootstrapModule);
  inject(configs, "injected-app-entry", appRoot);
  // inject(configs, "injected-flavor-module", flavorModule);
  // inject(configs, "injected-ssr-module", ssrEntryPoint);
  // inject default middlewares
  // inject(configs, "injected-default-middlewares", program.production ? "./middlewares/prod" : "./middlewares/dev");

  return configs;
}

function inject(configs: webpack.Configuration[], module: string, alias: string) {
  for (const item of configs) {
    item.resolve.alias[module] = alias;
  }
}

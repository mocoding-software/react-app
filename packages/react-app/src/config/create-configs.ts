import * as path from "path";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { createWebConfig } from "./create-web-config";
import { createServerConfig } from "./create-server-config";
import { Options } from "../cli/options";

export function createConfigs(settings: Options): webpack.Configuration[] {
  // Defaults:
  // projectRoot - root of the project (project.json location)
  // appRoot - application main directory
  // outputPath - build directory
  // outputPathServer - build directory
  // clientEntryPoint - entry point for client (browser) side
  // serverEntryPoint - entry point for server side (development only).
  // ssrEntryPoint - entry point for render function.
  const projectRootPath = process.cwd();
  const appRoot = path.join(projectRootPath, settings.appRoot);
  const outputPath = path.join(projectRootPath, settings.outputClientPath);
  const outputPathServer = path.join(projectRootPath, settings.outputServerPath);
  const tsConfigLocation = path.join(__dirname, "../../../react-app-common/tsconfig.base.json");
  const clientEntryPoint = "@mocoding/react-app-common/lib/client";
  const serverEntryPoint = "@mocoding/react-app-common/lib/server";
  const devServerEntryPoint = path.join(__dirname, "../dev-server");
  const devEntries = settings.production ? [] : ["webpack-hot-middleware/client", "react-hot-loader/patch"];
  const hmrEntry = `@mocoding/react-app-common/lib/entry/index.${settings.production ? "prod" : "dev"}.ts`;

  // client & server
  const client: webpack.Entry = {
    index: [...devEntries, clientEntryPoint],
  };

  const server: webpack.Entry = {
    server: settings.production ? serverEntryPoint : devServerEntryPoint,
  };

  // Creating configs
  let clientConfig = createWebConfig(tsConfigLocation, client, outputPath, settings.production);

  let serverConfig = createServerConfig(tsConfigLocation, server, outputPathServer, settings.production);

  // Adding default plugin
  // const definePlugin = new webpack.DefinePlugin({
  //   "process.env": {
  //     API_URL: JSON.stringify(settings.devApiUrl),
  //     NODE_ENV: JSON.stringify(settings.production ? "production" : "development"),
  //     SCRIPTS_TYPE: JSON.stringify(settings.type),
  //   },
  // });

  // clientConfig.plugins?.push(definePlugin);
  // serverConfig.plugins?.push(definePlugin);

  if (settings.analyze) {
    clientConfig.plugins.push(new BundleAnalyzerPlugin({ analyzerHost: "0.0.0.0" }));
    clientConfig.profile = true;
  }

  const configs = [clientConfig, serverConfig];

  // adding aliases for hot reload
  if (!settings.production) {
    inject(configs, "react-dom", "@hot-loader/react-dom");
  }

  // entry points
  inject(configs, "injected-bootstrap-module", settings.bootstrapModule);
  inject(configs, "injected-hmr-entry", hmrEntry);
  inject(configs, "injected-app-entry", appRoot);
  // inject default middlewares
  // inject(configs, "injected-default-middlewares", settings.production ? "./middlewares/prod" : "./middlewares/dev");

  return configs;
}

function inject(configs: webpack.Configuration[], module: string, alias: string) {
  for (const item of configs) {
    item.resolve.alias[module] = alias;
  }
}

import * as path from "path";
import * as fs from "fs";
import CopyPlugin from "copy-webpack-plugin";
import { Configuration, Entry } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { createWebConfig, createNodeConfig } from "@mocoding/build-scripts";
import { AppOptions } from "../cli/options";
import chalk from "chalk";

// function inject(configs: Configuration[], module: string, alias: string): void {
//   for (const item of configs) {
//     item.resolve.alias[module] = alias;
//   }
// }

export function createConfigs(settings: AppOptions): Configuration[] {
  // Defaults:
  // projectRoot - root of the project (project.json location)
  // appRoot - application main directory
  // outputPath - build directory
  // outputPathServer - build directory
  // clientEntryPoint - entry point for client (browser) side
  // serverEntryPoint - entry point for server side (development only).
  const projectRootPath = process.cwd();
  const frontendApp = path.join(projectRootPath, settings.clientEntry);
  const backendApp = path.join(projectRootPath, settings.serverEntry);
  const bootstrapModule = settings.bootstrapModule;
  const outputPath = path.join(projectRootPath, settings.outputClientPath);
  const outputPathServer = path.join(projectRootPath, settings.outputServerPath);
  // const defaultTsConfigLocation = path.join(
  //   __dirname,
  //   "../../../build-scripts/tsconfig.base.json",
  // );
  // const appTsConfigLocation = path.join(projectRootPath, "tsconfig.json");
  // const tsConfigLocation = fs.existsSync(appTsConfigLocation)
  //   ? appTsConfigLocation
  //   : defaultTsConfigLocation;
  // const clientEntryPoint = "@mocoding/react-app-common/client";
  // const serverEntryPoint = "@mocoding/react-app-common/server";
  // const devServerEntryPoint = path.join(__dirname, "../dev-server");
  // const devEntries = settings.production
  //   ? []
  //   : ["webpack-hot-middleware/client", "react-hot-loader/patch"];

  // if (fs.existsSync(outputPath)) fs.rmdirSync(outputPath, { recursive: true });
  // if (fs.existsSync(outputPathServer))
  //   fs.rmdirSync(outputPathServer, { recursive: true });

  delete process.env.TS_NODE_PROJECT;

  process.stdout.write(
    `${chalk.yellow("Environment         :")} ${settings.production}\n`,
  );
  process.stdout.write(`${chalk.yellow("Frontend            :")} ${frontendApp}\n`);
  process.stdout.write(`${chalk.yellow("Backend             :")} ${backendApp}\n`);
  // process.stdout.write(`${chalk.yellow("Bootstrap Module    :")} ${bootstrapModule}\n`);
  process.stdout.write(`${chalk.yellow("Output Path (server):")} ${outputPathServer}\n`);
  process.stdout.write(`${chalk.yellow("Output Path (client):")} ${outputPath}\n`);
  // process.stdout.write(`${chalk.yellow("Typescript Config   :")} ${tsConfigLocation}\n`);

  // client & server
  // const client: Entry = {
  //   app: [frontendApp], //...devEntries
  // };

  // const server: Entry = {
  //   server: backendApp,
  // };

  // // Creating configs
  // const clientConfig = createWebConfig(client, outputPath, settings.production);
  // const serverConfig = createNodeConfig(server, outputPathServer, settings.production);

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

  // replace domain task alias to avoid unnecessary dependencies on the client
  // const clientDomainTask =
  //   "@mocoding/react-app-router-redux-async/client-safe-domain-task";
  // clientConfig.resolve.alias["domain-task"] = clientDomainTask;

  // if (settings.analyze) {
  //   clientConfig.plugins.push(new BundleAnalyzerPlugin({ analyzerHost: "0.0.0.0" }));
  //   clientConfig.profile = true;
  // }

  // serverConfig.plugins!.push(
  //   new CopyPlugin({
  //     patterns: [
  //       {
  //         from: path.join(__dirname, "../../../server/lib/server.development.js"),
  //         to: "server.js",
  //       },
  //       {
  //         from: path.join(__dirname, "../../../server/lib/server.development.map"),
  //         to: "server.map",
  //       },
  //     ],
  //   }),
  // );

  // clientConfig.plugins!.push(
  //   new CopyPlugin({
  //     patterns: [
  //       path.join(__dirname, "../../../react-app-common/lib/frontend/vendors.js"),
  //       path.join(__dirname, "../../../react-app-common/lib/frontend/index.js"),
  //       path.join(__dirname, "../../../react-app-basic/lib/bootstrap.js"),
  //     ],
  //   }),
  // );
  // clientConfig.plugins!.push(vendorsDll.consume());

  //const configs = [serverConfig]; //] //[clientConfig, serverConfig];

  // adding aliases for hot reload
  // if (!settings.production) {
  //   inject(configs, "react-dom", "@hot-loader/react-dom");
  // }

  // // entry points
  // inject(configs, "injected-bootstrap-module", bootstrapModule);
  // inject(configs, "injected-app-entry", frontendApp);

  return [];
}

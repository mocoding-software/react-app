import * as path from "path";
import * as fs from "fs";
import CopyPlugin from "copy-webpack-plugin";
import { Configuration, Entry } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { createWebConfig, createNodeConfig, Dll } from "@mocoding/build-scripts";
import { AppOptions } from "../cli/options";
import nodeExternals from "webpack-node-externals";
import chalk from "chalk";

const vendorsDll = new Dll(
  __dirname + "../../../../react-app-basic/lib/frontend",
  "vendors",
  "umd",
);

function inject(configs: Configuration[], module: string, alias: string): void {
  for (const item of configs) {
    (item.resolve!.alias as any)[module] = alias;
  }
}

export function createConfigs(settings: AppOptions): Configuration[] {
  // Defaults:
  // projectRoot - root of the project (project.json location)
  // appRoot - application main directory
  // outputPath - build directory
  // outputPathServer - build directory
  // clientEntryPoint - entry point for client (browser) side
  // serverEntryPoint - entry point for server side (development only).
  const projectRootPath = process.cwd();
  const appRoot = path.join(projectRootPath, settings.clientEntry);
  const bootstrapModule = settings.bootstrapModule;
  const outputPath = path.join(projectRootPath, settings.outputClientPath);
  const outputPathServer = path.join(projectRootPath, settings.outputServerPath);
  const defaultTsConfigLocation = path.join(
    __dirname,
    "../../../build-scripts/tsconfig.base.json",
  );
  const appTsConfigLocation = path.join(projectRootPath, "tsconfig.json");
  const tsConfigLocation = fs.existsSync(appTsConfigLocation)
    ? appTsConfigLocation
    : defaultTsConfigLocation;
  const clientEntryPoint = "@mocoding/react-app-common/client";
  const serverEntryPoint = "@mocoding/react-app-common/server";
  const devServerEntryPoint = path.join(__dirname, "../dev-server");
  // v2: should be moved to common.
  // const devEntries = settings.production
  //   ? []
  //   : ["webpack-hot-middleware/client", "react-hot-loader/patch"];

  if (fs.existsSync(outputPath)) fs.rmdirSync(outputPath, { recursive: true });

  delete process.env.TS_NODE_PROJECT;

  process.stdout.write(`${chalk.yellow("Application Root    :")} ${appRoot}\n`);
  process.stdout.write(`${chalk.yellow("Bootstrap Module    :")} ${bootstrapModule}\n`);
  process.stdout.write(`${chalk.yellow("Output Path (client):")} ${outputPath}\n`);
  process.stdout.write(`${chalk.yellow("Output Path (server):")} ${outputPathServer}\n`);
  process.stdout.write(`${chalk.yellow("Typescript Config   :")} ${tsConfigLocation}\n`);

  // client & server
  const appEntry: Entry = {
    app: [appRoot],
  };

  const server: Entry = {
    ssr: settings.production ? serverEntryPoint : devServerEntryPoint,
  };

  // Creating configs
  const clientConfig = createWebConfig(
    appEntry,
    outputPath,
    settings.production,
    tsConfigLocation,
  );
  const serverConfig = createNodeConfig(appEntry, outputPathServer, settings.production);

  clientConfig.plugins!.push(vendorsDll.consume());

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
  // v2: this may not be needed.
  // const clientDomainTask =
  //   "@mocoding/react-app-router-redux-async/client-safe-domain-task";
  // (clientConfig.resolve!.alias as any)["domain-task"] = clientDomainTask;

  if (settings.analyze) {
    clientConfig.plugins!.push(new BundleAnalyzerPlugin({ analyzerHost: "0.0.0.0" }));
    clientConfig.profile = true;
  }

  const nm_root = "../../..";

  clientConfig.plugins!.push(
    new CopyPlugin({
      patterns: [
        //v2: react-app-basic - should be comming from config
        path.resolve(__dirname, nm_root, "react-app-basic/lib/frontend/vendors.js"),
        path.resolve(__dirname, nm_root, "react-app-basic/lib/frontend/vendors.js.map"),
        path.resolve(__dirname, nm_root, "react-app-basic/lib/frontend/index.js"),
        path.resolve(__dirname, nm_root, "react-app-basic/lib/frontend/index.js.map"),
      ],
    }),
  );

  serverConfig.plugins!.push(
    new CopyPlugin({
      patterns: [
        //v2: react-app-basic - should be comming from config
        {
          from: path.resolve(__dirname, nm_root, "react-app-basic/lib/backend/index.js"),
          to: "ssr.js",
        },
      ],
    }),
  );

  serverConfig.externals = [nodeExternals()];

  const configs = [clientConfig, serverConfig];

  // v2: this should be in vendors for development.
  // adding aliases for hot reload
  // if (!settings.production) {
  //   inject(configs, "react-dom", "@hot-loader/react-dom");
  // }

  return configs;
}

import * as path from "path";
import * as fs from "fs";
import CopyPlugin from "copy-webpack-plugin";
import { Configuration, Entry } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { createWebConfig, createNodeConfig } from "@mocoding/build-scripts";
import nodeExternals from "webpack-node-externals";
import { AppOptions } from "../cli/options";
import chalk from "chalk";

export function createServerConfig(settings: AppOptions): Configuration {
  // Defaults:
  // projectRootPath - root of the project (project.json location)
  // appRoot - application main directory
  // outputPath - build directory
  const projectRootPath = process.cwd();
  const appRoot = path.join(projectRootPath, settings.serverEntry);
  const outputPath = path.join(projectRootPath, settings.outputServerPath);

  delete process.env.TS_NODE_PROJECT;

  const env = settings.production ? "production" : "development";

  process.stdout.write(`${chalk.yellow("Environment         :")} ${env}\n`);
  process.stdout.write(`${chalk.yellow("Application         :")} ${appRoot}\n`);
  process.stdout.write(`${chalk.yellow("Output Path         :")} ${outputPath}\n`);

  const server: Entry = {
    server: appRoot,
  };

  // Creating configs
  const config = createNodeConfig(server, outputPath, settings.production);

  if (!settings.production) {
    config.externals = [nodeExternals({ additionalModuleDirs: ["../../node_modules"] })];
    config.externals = {
      "@mocoding/server": "@mocoding/react-app/lib/dev-server.js",
    };

    console.log(config.resolve!.alias);
    process.stdout.write(
      `Running in development mode. Injecting dev-server and stripping node_modules.\n`,
    );
  }

  return config;

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
}

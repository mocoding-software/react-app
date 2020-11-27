import { registerCommand } from "../command";
import path from "path";
//import express from "express";
import webpack, { Configuration } from "webpack";
import NodemonPlugin from "nodemon-webpack-plugin";
import { printIncrementalResults, printResults } from "../printResults";
import { AppOptions } from "index";
import { createServerConfig } from "../../config";
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const devMiddleware = require("webpack-dev-middleware");
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const hotMiddleware = require("webpack-hot-middleware");
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const hotServerMiddleware = require("webpack-hot-server-middleware");

function serve(opts: AppOptions): void {
  const config = createServerConfig(opts);
  config.watch = true;
  config.plugins!.push(
    new NodemonPlugin({
      watch: path.resolve("build/server.js"),
      script: "build/server.js",
      ext: "js,graphql,env",
    }) as any,
  );
  process.stdout.write("Starting watch mode...\n");
  webpack(config, printIncrementalResults);
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore - The typings are not updated yet
  // compiler.run({}, printIncrementalResults);

  // const app = express();
  // const port = process.env.PORT || 3000;
  // process.stdout.write("Starting the development server.\n");

  // const devMiddlewareInstance = devMiddleware(compiler, {
  //   serverSideRender: true,
  //   stats: false,
  //   writeToDisk: true,
  // });

  // app.use(devMiddlewareInstance);

  // app.use(hotMiddleware(compiler.compilers.find((_) => _.name === "client")));

  // app.use(hotServerMiddleware(compiler, { chunkName: "server" }));

  // app.listen(port, () =>
  //   devMiddlewareInstance.waitUntilValid(() => {
  //     process.stdout.write(`Listening on port ${port}\n`);
  //   }),
  // );
}

registerCommand("serve", "Start development server", serve);

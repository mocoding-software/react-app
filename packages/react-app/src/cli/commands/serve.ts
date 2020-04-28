import { Options, registerCommand } from "../options";
import { createConfigs } from "../../config";
import express from "express";
import webpack from "webpack";
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");
const hotServerMiddleware = require("webpack-hot-server-middleware");
import { printResults } from "../printResults";

function config(opts: Options) {
  const configs = createConfigs(opts);
  const compiler = webpack(configs);
  const app = express();
  const port = process.env.PORT || 3000;
  process.stdout.write("Starting the development server.\n");

  const devMiddlewareInstance = devMiddleware(compiler, {
    serverSideRender: true,
    stats: false,
    writeToDisk: true,
  });

  app.use(devMiddlewareInstance);

  app.use(hotMiddleware(compiler.compilers.find((_) => _.name === "client")));

  app.use(hotServerMiddleware(compiler, { chunkName: "server" }));

  app.listen(port, () =>
    devMiddlewareInstance.waitUntilValid(() => {
      process.stdout.write(`Listening on port ${port}\n`);
    }),
  );
}

registerCommand("serve", "Start development server").action(config);

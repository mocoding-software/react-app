import { registerCommand } from "../command";
import express from "express";
import webpack, { Configuration } from "webpack";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const devMiddleware = require("webpack-dev-middleware");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const hotMiddleware = require("webpack-hot-middleware");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const hotServerMiddleware = require("webpack-hot-server-middleware");

function serve(configs: Configuration[]): void {
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

registerCommand("serve", "Start development server", serve);

import path from "path";
import {
  DefaultServerOptions,
  Server as BaseServer,
  ServerOptions,
} from "@mocoding/server";
import { DefaultAppOption } from "../cli/options";
import { createConfigs } from "../config";
import webpack from "webpack";
import chalk from "chalk";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const devMiddleware = require("webpack-dev-middleware");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const hotMiddleware = require("webpack-hot-middleware");
import hotSsrMiddleware from "./hot-ssr";

function nocache(module: string) {
  require("fs").watchFile(module, () => {
    delete require.cache[require.resolve(module)];
  });
}

export class Server extends BaseServer {
  constructor(options: ServerOptions = DefaultServerOptions) {
    super(options);

    const configs = createConfigs(DefaultAppOption);
    const compiler = webpack(configs);

    const devMiddlewareInstance = devMiddleware(compiler, {
      serverSideRender: true,
      writeToDisk: true,
    });

    this.app.use(devMiddlewareInstance);

    this.app.use(hotMiddleware(compiler.compilers[0]));

    // nocache(appModule);

    this.app.use(hotSsrMiddleware(compiler));
  }
}

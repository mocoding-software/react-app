import {
  DefaultServerOptions,
  Server as BaseServer,
  ServerOptions,
} from "@mocoding/server";
import { DefaultAppOption } from "./cli/options";
import { createConfigs } from "./config";
import webpack from "webpack";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const devMiddleware = require("webpack-dev-middleware");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const hotMiddleware = require("webpack-hot-middleware");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const hotServerMiddleware = require("webpack-hot-server-middleware");

export class Server extends BaseServer {
  constructor(options: ServerOptions = DefaultServerOptions) {
    super(options);

    const configs = createConfigs(DefaultAppOption);
    const compiler = webpack(configs);

    const devMiddlewareInstance = devMiddleware(compiler, {
      serverSideRender: true,
      stats: false,
      writeToDisk: true,
    });

    this.app.use(devMiddlewareInstance);

    this.app.use(hotMiddleware(compiler.compilers.find((_) => _.name === "frontend")));

    this.app.use(hotServerMiddleware(compiler, { chunkName: "backend" }));

    // this.app.listen(port, () =>
    //   devMiddlewareInstance.waitUntilValid(() => {
    //     process.stdout.write(`Listening on port ${port}\n`);
    //   }),
    // );
  }
}

// import { Request, Response, NextFunction } from "express";
// import {
//   RedirectResult,
//   RenderCallback,
//   RenderFuncProps,
//   RenderHtmlResult,
// } from "@mocoding/react-app-common";

// import { render } from "injected-bootstrap-module/render";

// function serverRenderer() {
//   return (req: Request, res: Response, next: NextFunction) => {
//     process.stdout.write(`Request ${req.originalUrl}\n`);
//     const jsonStats = res.locals.webpackStats.stats[0].toJson();
//     const assets = jsonStats.assetsByChunkName;
//     const assetsUrls: string[] = [].concat(...Object.values(assets));
//     const defaultApiUrl = `${req.protocol}://${req.hostname}`;
//     const apiUrl = process.env.MOAPP_API_URL;
//     const baseUrl = typeof apiUrl !== "undefined" ? apiUrl : defaultApiUrl;
//     const callback: RenderCallback = (error, result) => {
//       if (error) {
//         return next(error);
//       } else if (result) {
//         const htmlResult = result as RenderHtmlResult;
//         if (htmlResult.html) {
//           res.status(200).send(htmlResult.html);
//         } else {
//           const redirectResult = result as RedirectResult;
//           res.redirect(301, redirectResult.redirectUrl);
//         }
//       }
//     };
//     const props: RenderFuncProps = {
//       assets: assetsUrls,
//       baseUrl,
//       requestUrl: req.originalUrl,
//     };
//     render(callback, props);
//   };
// }

// export default serverRenderer;

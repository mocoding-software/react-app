import { Request, Response, NextFunction } from "express";
import {
  RedirectResult,
  RenderCallback,
  RenderFuncProps,
  RenderHtmlResult,
} from "@mocoding/react-app-common";

import { render } from "injected-bootstrap-module/render";

function serverRenderer() {
  return (req: Request, res: Response, next: NextFunction) => {
    process.stdout.write(`Request ${req.originalUrl}\n`);
    const jsonStats = res.locals.webpackStats.stats[0].toJson();
    const assets = jsonStats.assetsByChunkName;
    const assetsUrls: string[] = [].concat(...Object.values(assets));
    const defaultApiUrl = `${req.protocol}://${req.hostname}`;
    const apiUrl = process.env.MOAPP_API_URL;
    const baseUrl = typeof apiUrl !== "undefined" ? apiUrl : defaultApiUrl;
    const callback: RenderCallback = (error, result) => {
      if (error) {
        return next(error);
      } else if (result) {
        const htmlResult = result as RenderHtmlResult;
        if (htmlResult.html) {
          res.status(200).send(htmlResult.html);
        } else {
          const redirectResult = result as RedirectResult;
          res.redirect(301, redirectResult.redirectUrl);
        }
      }
    };
    const props: RenderFuncProps = {
      assets: assetsUrls,
      baseUrl,
      requestUrl: req.originalUrl,
    };
    render(callback, props);
  };
}

export default serverRenderer;

import { Request, Response, NextFunction, RequestHandler } from "express";
import { InlineScript } from "./html";
import { boundMethod } from "autobind-decorator";

export interface RenderFuncProps {
  requestUrl: string;
  baseUrl: string;
  assets: string[];
  inlineScripts?: InlineScript[];
  timeout?: number;
}

export type RenderFunc = (callback: RenderCallback, props: RenderFuncProps) => void;

export type RenderCallback = (error?: Error, result?: RenderResult) => void;

export interface RenderHtmlResult {
  html: string;
}
export interface RedirectResult {
  redirectUrl: string;
}

export declare type RenderResult = RenderHtmlResult | RedirectResult;

export class SsrFactory {
  public handler: RequestHandler;
  constructor(protected renderFunc: RenderFunc) {
    this.handler = (req: Request, res: Response, next: NextFunction) => {
      process.stdout.write(`Request ${req.originalUrl}\n`);
      // const jsonStats = res.locals.webpackStats.stats[0].toJson();
      // const assets = jsonStats.assetsByChunkName;
      // v2: remove any
      const assetsUrls: string[] = ["vendors.js", "app.js", "index.js"];
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
      renderFunc(callback, props);
    };
  }
}

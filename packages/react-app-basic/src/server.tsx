import * as React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { Context } from "@mocoding/react-app-common/common";
import {
  HelmetHtml,
  HelmetHtmlProps,
  RenderCallback,
  RenderFuncProps,
  SsrFactory,
} from "@mocoding/react-app-common/backend";
import { App, createContext } from "./app";

function render(callback: RenderCallback, props: RenderFuncProps): void {
  try {
    const context: Context = createContext();
    context.helmetContext = {}; // init helmet for ssr
    const markup = renderToString(<App context={context} />);

    const htmlProps: HelmetHtmlProps = {
      assets: props.assets,
      context,
      inlineScripts: props.inlineScripts,
      markup,
    };

    const html = "<!DOCTYPE html>" + renderToStaticMarkup(<HelmetHtml {...htmlProps} />);

    callback(undefined, {
      html,
    });
  } catch (error) {
    callback(error);
  }
}

const factory = new SsrFactory(render);

const spaMiddleware = factory.handler;
export default spaMiddleware;

import * as React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { Context, RenderCallback, RenderFuncProps } from "@mocoding/react-app-common";
import { HelmetHtml, HelmetHtmlProps } from "@mocoding/react-app-common";
import { App } from "./app";
import { createContext } from "./createContext";

export function render(callback: RenderCallback, props: RenderFuncProps): void {
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

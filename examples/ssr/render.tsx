import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// ../../app/common -> "webpack-typescript-builder/app/common"
// ../../app/components -> "webpack-typescript-builder/app/components"
import {
  Html,
  HtmlProps,
  RenderCallback,
  RenderFuncProps,
} from "@mocoding/react-app-common";

export default function render(callback: RenderCallback, props: RenderFuncProps): void {
  try {
    const htmlProps: HtmlProps = {
      assets: props.assets,
      inlineScripts: props.inlineScripts,
      markup: "",
    };

    const html = renderToStaticMarkup(
      <Html {...htmlProps}>
        <title>Custom SSR</title>
      </Html>,
    );

    callback(undefined, {
      html,
    });
  } catch (error) {
    callback(error);
  }
}

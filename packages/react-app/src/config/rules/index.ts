import * as webpack from "webpack";
import { css, noCss } from "./css";
import { favicon, noFavicon } from "./favicon";
import { fonts, noFonts } from "./fonts";
import { images, noImages } from "./images";
import { noSass, sass, sassGlob } from "./sass";
import { eslint } from "./eslint";
import { typescript } from "./typescript";

export const clientRules: (
  isProduction: boolean,
) => webpack.RuleSetRule[] = isProduction => [
  typescript,
  // eslint,
  css(isProduction),
  sass(isProduction),
  sassGlob,
  fonts,
  images,
  favicon,
];
export const serverRules = [
  typescript,
  // eslint,
  noCss,
  noSass,
  noFonts,
  noImages,
  noFavicon,
];

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

const cssRegex = /\.css$/i;

export const css: (isProduction: boolean) => webpack.RuleSetRule = (isProduction) => ({
  test: cssRegex,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: !isProduction,
      },
    },
    "css-loader",
  ],
});

export const noCss: webpack.RuleSetRule = {
  test: cssRegex,
  use: "ignore-loader",
};

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

const sassRegex = /\.s[ac]ss$/i;

export const sass: (isProduction: boolean) => webpack.RuleSetRule = (isProduction) => ({
  test: sassRegex,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: !isProduction,
      },
    },
    "css-loader",
    "sass-loader",
  ],
});

export const sassGlob: webpack.RuleSetRule = {
  enforce: "pre",
  test: sassRegex,
  use: "import-glob",
};

export const noSass: webpack.RuleSetRule = {
  test: sassRegex,
  use: "ignore-loader",
};

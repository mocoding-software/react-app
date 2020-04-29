import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import * as webpack from "webpack";
import { typescript, css, sass, fonts, sassGlob, images, favicon } from "./rules";

export function createWebConfig(
  tsConfigLocation: string,
  entry: webpack.Entry,
  outputPath: string,
  isProd: boolean,
): webpack.Configuration {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: isProd ? "[name].[contenthash:6].css" : "[name].css",
    }),
  ];

  const rules: webpack.RuleSetRule[] = [
    typescript(tsConfigLocation),
    // eslint,
    css(isProd),
    sass(isProd),
    sassGlob,
    fonts,
    images,
    favicon,
  ];

  if (!isProd) {
    plugins.push(new webpack.HotModuleReplacementPlugin({ quiet: true }));
  } else {
    plugins.push(
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require("cssnano"),
        cssProcessorOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
      }),
    );
  }

  return {
    devtool: isProd ? undefined : "cheap-module-eval-source-map",
    entry,
    mode: isProd ? "production" : "development",
    module: { rules },
    name: "client",
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
      noEmitOnErrors: false,
      splitChunks: {
        cacheGroups: {
          styles: {
            chunks: "all",
            enforce: true,
            name: "styles",
            test: /\.css$/,
          },
          vendors: {
            chunks: "all",
            name: "vendors",
            test: /[\\/]node_modules[\\/]/,
          },
        },
      },
    },
    output: {
      filename: isProd ? "[name].[contenthash:6].js" : "[name].js",
      library: "[name]",
      libraryTarget: "umd",
      path: outputPath,
      pathinfo: false,
      publicPath: "/",
    },
    plugins,
    resolve: {
      alias: {},
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      plugins: [new TsconfigPathsPlugin({ configFile: tsConfigLocation, logInfoToStdOut: true, logLevel: "ERROR" })],
    },
    stats: true,
  };
}

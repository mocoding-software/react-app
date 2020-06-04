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
  isProduction: boolean,
): webpack.Configuration {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: isProduction ? "[name].[contenthash:6].css" : "[name].css",
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ];

  const rules: webpack.RuleSetRule[] = [
    favicon,
    typescript(tsConfigLocation),
    css(isProduction),
    sass(isProduction),
    sassGlob,
    fonts,
    images,
  ];

  if (!isProduction) {
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
    devtool: isProduction ? undefined : "cheap-module-eval-source-map",
    entry,
    mode: isProduction ? "production" : "development",
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
      filename: isProduction ? "[name].[contenthash:6].js" : "[name].js",
      library: "[name]",
      libraryTarget: "umd",
      path: outputPath,
      pathinfo: false,
      publicPath: "/",
    },
    plugins,
    resolve: {
      alias: {},
      extensions: [".js", ".jsx", ".ts", ".tsx", isProduction ? ".prod.ts" : ".dev.ts"],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: tsConfigLocation,
          logInfoToStdOut: true,
          logLevel: "ERROR",
        }),
      ],
    },
    stats: true,
  };
}

import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import * as webpack from "webpack";
import { typescript, noCss, noSass, noFonts, noImages, noFavicon } from "./rules";

export function createServerConfig(
  tsConfigLocation: string,
  entry: webpack.Entry,
  outputPath: string,
  isProduction: boolean,
): webpack.Configuration {
  const rules: webpack.RuleSetRule[] = [
    typescript(tsConfigLocation),
    noCss,
    noSass,
    noFonts,
    noImages,
    noFavicon,
  ];
  return {
    devtool: isProduction ? "source-map" : "cheap-module-eval-source-map",
    entry,
    mode: isProduction ? "production" : "development",
    module: { rules },
    name: "server",
    optimization: {
      minimize: false,
      namedChunks: true,
      namedModules: true,
    },
    output: {
      filename: "[name].js",
      libraryTarget: "commonjs2",
      path: outputPath,
      pathinfo: false,
      publicPath: "/",
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        eslint: true,
        tsconfig: tsConfigLocation,
        measureCompilationTime: false,
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
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
    stats: false,
    target: "node",
  };
}

import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import * as path from "path";

import * as webpack from "webpack";
import { typescript, noCss, noSass, noFonts, noImages, noFavicon } from "./rules";

export function createNodeConfig(
  entry: webpack.Entry,
  outputPath: string,
  isProduction: boolean,
  tsConfigLocation: string = path.resolve(__dirname, "../tsconfig.node.json"),
): webpack.Configuration {
  process.stdout.write(tsConfigLocation + "\n");
  const rules: webpack.RuleSetRule[] = [
    noFavicon,
    typescript(tsConfigLocation),
    noCss,
    noSass,
    noFonts,
    noImages,
  ];
  return {
    devtool: "source-map",
    entry,
    externalsPresets: {
      node: true,
    },
    mode: isProduction ? "production" : "development",
    module: { rules },
    name: "server",
    optimization: {
      minimize: false,
      moduleIds: "named",
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
        eslint: { enabled: true, files: "src/**/*.{ts,tsx,js,jsx}" },
        typescript: { configFile: tsConfigLocation },
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
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
    stats: true,
    target: "node",
  };
}

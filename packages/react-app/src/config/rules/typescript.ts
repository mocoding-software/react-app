import tsImportPluginFactory from "ts-import-plugin";
import * as webpack from "webpack";

export const typescript: (configFile: string) => webpack.Rule = (configFile) => ({
  test: /\.(ts|tsx)?$/,
  use: {
    loader: "ts-loader",
    options: {
      allowTsInNodeModules: true,
      compilerOptions: {
        module: "es2015",
      },
      experimentalWatchApi: true,
      getCustomTransformers: () => ({
        before: [tsImportPluginFactory(/** options */)],
      }),
      onlyCompileBundledFiles: true,
      transpileOnly: true,
      configFile,
    },
  },
});

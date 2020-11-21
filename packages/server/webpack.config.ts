import { createNodeConfig } from "@mocoding/build-scripts";
import * as webpack from "webpack";

function createConfig(env: any, argv: any): webpack.Configuration {
  // const isProd = argv.mode == "production";
  const config = createNodeConfig(
    { index: __dirname + "/src/index.ts" },
    __dirname + "/lib",
    true,
  );

  config.externals = {
    "injected-server": "./server.js",
  };

  return config;
}

export default createConfig;

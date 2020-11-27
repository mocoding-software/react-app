import { createWebConfig } from "@mocoding/build-scripts";
import * as webpack from "webpack";

import { vendorsDll } from "../react-app-common/webpack.config.vendors";

function createConfig(env: any, argv: any): webpack.Configuration {
  // const isProd = argv.mode == "production";
  const config = createWebConfig(
    { bootstrap: __dirname + "/index.ts" },
    __dirname + "/lib",
    false,
  );

  config.plugins.push(vendorsDll.consume());

  return config;
}

export default createConfig;

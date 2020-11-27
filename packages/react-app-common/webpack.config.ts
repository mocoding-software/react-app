import { createWebConfig } from "@mocoding/build-scripts";
import * as webpack from "webpack";

import { vendorsDll } from "./webpack.config.vendors";

function createConfig(env: any, argv: any): webpack.Configuration {
  // const isProd = argv.mode == "production";
  const config = createWebConfig(
    { index: __dirname + "/src/frontend/index" },
    __dirname + "/lib/frontend",
    false,
  );

  config.plugins.push(vendorsDll.consume());

  config.externals = {
    "injected-bootstrap-module": "bootstrap",
  };

  return config;
}

export default createConfig;

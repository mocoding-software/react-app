import { createNodeConfig, createWebConfig } from "@mocoding/build-scripts";
import * as webpack from "webpack";
import nodeExternals from "webpack-node-externals";

import { vendorsDll } from "./webpack.config.vendors";

function createConfig(env: any, argv: any): webpack.Configuration[] {
  // const isProd = argv.mode == "production";
  const webConfig = createWebConfig(
    { index: __dirname + "/src/client" },
    __dirname + "/lib/frontend",
    false,
  );

  webConfig.plugins.push(vendorsDll.consume());

  webConfig.externals = {
    "injected-app-entry": "app",
  };

  const nodeConfig = createNodeConfig(
    { index: __dirname + "/src/server" },
    __dirname + "/lib/backend",
    false,
  );

  nodeConfig.externals = {
    "injected-app-entry": "./app.js",
    // for dev only
    react: "react",
    "express": "express",
    "react-dom/server": "react-dom/server",
    "react-helmet-async": "react-helmet-async",
  };

  return [webConfig, nodeConfig];
}

export default createConfig;

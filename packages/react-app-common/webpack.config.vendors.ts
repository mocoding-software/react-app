import { createWebConfig, Dll } from "@mocoding/build-scripts";
import * as webpack from "webpack";

export const vendorsDll = new Dll(__dirname + "/lib/frontend", "vendors", "umd");
// export const serverVendorsDll = new Dll("./lib/backend", "commonjs2",);

function createConfig(env: any, argv: any): webpack.Configuration {
  // const isProd = argv.mode == "production";

  let entry: webpack.Entry = {
    vendors: ["react", "react-dom", "react-helmet-async"],
  };
  const config = createWebConfig(entry, __dirname + "/lib/frontend", false);

  config.plugins!.push(vendorsDll.produce());

  return config;
}

export default createConfig;

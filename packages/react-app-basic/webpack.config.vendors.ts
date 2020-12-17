import { createNodeConfig, createWebConfig, Dll } from "@mocoding/build-scripts";
import * as webpack from "webpack";

export const vendorsDll = new Dll(__dirname + "/lib/frontend", "vendors", "umd");
export const serverVendorsDll = new Dll(
  __dirname + "/lib/backend",
  "vendors",
  "commonjs2",
);

function createConfig(env: any, argv: any): webpack.Configuration[] {
  // const isProd = argv.mode == "production";

  const webConfig = createWebConfig(
    {
      vendors: ["react", "react-dom", "react-helmet-async"],
    },
    __dirname + "/lib/frontend",
    false,
  );

  // const nodeConfig = createNodeConfig(
  //   {
  //     vendors: ["react", "react-dom/server", "react-helmet-async"],
  //   },
  //   __dirname + "/lib/backend",
  //   false,
  // );

  webConfig.plugins!.push(vendorsDll.produce());
  // nodeConfig.plugins!.push(serverVendorsDll.produce());

  return [webConfig];
}

export default createConfig;

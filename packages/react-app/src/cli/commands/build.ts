import program from "commander";
import webpack from "webpack";
import { defaultSettings, Settings, createConfigs } from "../../config";
// import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { printResults } from "../printResults";
// import { createConfigs } from "./config";

function build(dir: string) {
  const settings: Partial<Settings> = {  
    appModule: dir || ""
  }

  const mergedSettings: Settings = {
    ...defaultSettings,
    ...settings
  }

  const configs = createConfigs(mergedSettings)

  // if (program.analyze) {
  //   config[0].plugins.push(new BundleAnalyzerPlugin());
  //   config[0].profile = true;
  // }

  const compiler = webpack(configs);
  // @ts-ignore - The typings are not updated yet
  compiler.run(printResults);
}

program.command("build [dir]").action(build);

import { Options, registerCommand } from "../options";
import { createConfigs } from "../../config";

function config(opts: Options) {
  const configs = createConfigs(opts);
  // tslint:disable-next-line: no-console
  console.log(configs);
}

registerCommand("config", "Display Webpack configuration").action(config);

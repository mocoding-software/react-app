import { registerCommand } from "../command";

import { Configuration } from "webpack";

function config(configs: Configuration[]): void {
  // tslint:disable-next-line: no-console
  console.log(configs);
}

registerCommand("config", "Display Webpack configuration", config);

import { registerCommand } from "../command";

import webpack, { Configuration } from "webpack";
import { printResults } from "../printResults";

function build(configs: Configuration[]): void {
  const compiler = webpack(configs);
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore - The typings are not updated yet
  compiler.run(printResults);
}

registerCommand("build", "Build Application", build);

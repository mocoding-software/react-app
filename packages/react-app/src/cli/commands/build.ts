import { registerCommand } from "../command";

import webpack, { Configuration } from "webpack";
import { printResults } from "../printResults";
import { AppOptions } from "cli/options";
import { createServerConfig } from "../../config";

function build(opts: AppOptions): void {
  const config = createServerConfig(opts);
  webpack(config, printResults);
  // process.stdout.write("Build!!!");
  // compiler.run(printResults);
}

registerCommand("build", "Build Application", build);

import { Command } from "commander";
import { Options, registerCommand } from "../options";
import { createConfigs } from "../../config";
import webpack from "webpack";
import { printResults } from "../printResults";

function build(opts: Options) {
  const configs = createConfigs(opts);

  const compiler = webpack(configs);
  // @ts-ignore - The typings are not updated yet
  compiler.run(printResults);
}

registerCommand("build", "Build Application").action(build);

import program from "commander";
import { AppOptions, CliOptions, DefaultAppOption } from "./options";
import { cosmiconfigSync } from "cosmiconfig";

export type Command = (cliOptions: AppOptions) => void;

function createAction(command: Command) {
  return (): void => {
    const explorer = cosmiconfigSync("moapp");
    const cliOptions: CliOptions = program.opts() as CliOptions;
    let opts: AppOptions = {
      ...DefaultAppOption,
      ...cliOptions,
    };
    if (opts.config) process.stdout.write(`using custom configuration: ${opts.config}\n`);
    const result = opts.config ? explorer.load(opts.config) : explorer.search();
    if (result && !result.isEmpty) {
      opts = { ...opts, ...result.config, config: result.filepath || opts.config };
    }

    command(opts);
  };
}

export function registerCommand(
  title: string,
  description: string,
  command: Command,
): program.Command {
  return program.command(title).description(description).action(createAction(command));
}

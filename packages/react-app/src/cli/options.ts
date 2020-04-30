import program from "commander";

export interface Options {
  version: string;
  production: boolean;
  analyze: boolean;
  outputClientPath: string;
  outputServerPath: string;
  bootstrapModule: string;
  appEntry: string;
  // devApiUrl: string;
}

export function registerCommand(command: string, description: string): program.Command {
  return program
    .command(command)
    .description(description)
    .option("-p, --production", "build for production", false)
    .option("-a, --analyze", "enable bundle analyzer", false)
    .option("-e, --appEntry [path]", "specify application root", ".")
    .option(
      "-b, --bootstrapModule [path]",
      "sets bootstrap module",
      "@mocoding/react-app-basic",
    )
    .option(
      "-oc, --outputClientPath [path]",
      "sets output path for client files",
      "./wwwroot",
    )
    .option(
      "-os, --outputServerPath [path]",
      "sets output path for server files. module",
      "./wwwroot_node",
    );
}

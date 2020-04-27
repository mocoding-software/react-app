#!/usr/bin/env node

import program from "commander";
import "./commands";

program
  .version("0.0.1")
  .description("Mocoding React Web Application")
  .option("-p, --production", "build for production")
  .option("-d, --debug", "enable extra debug options")
  .option("-a, --analyze", "enable bundle analyzer")
  .option("--inspect-brk", "node debug");

program.parse(process.argv);

// Check the program.args obj
const NO_COMMAND_SPECIFIED = program.args.length === 0;

// Handle it however you like
if (NO_COMMAND_SPECIFIED) {
  // e.g. display usage
  program.help();
}

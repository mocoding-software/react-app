#!/usr/bin/env node

import program from "commander";
import "./commands";

program.version("0.0.1").description("Mocoding React Web Application");

program.parse(process.argv);

// Check the program.args obj
const NO_COMMAND_SPECIFIED = program.args.length === 0;

// Handle it however you like
if (NO_COMMAND_SPECIFIED) {
  // e.g. display usage
  program.help();
}

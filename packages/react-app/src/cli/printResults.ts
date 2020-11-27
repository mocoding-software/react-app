import chalk from "chalk";
import * as path from "path";
import { Stats } from "webpack";

interface TsError {
  file: string;
  message: string;
  details: string;
}

function printErrors(errors: TsError[]): void {
  for (const issue of errors) {
    process.stdout.write(chalk.red(issue.message));
    process.stdout.write("\n");
  }
}
function printWarnings(warnings: TsError[]): void {
  for (const issue of warnings) {
    process.stdout.write(chalk.yellow(issue.message));
    process.stdout.write("\n");
  }
}

function printFiles(stats: Stats, name: string): void {
  const out = stats.compilation.outputOptions.path;
  const target = stats.compilation.outputOptions.library!.type;
  process.stdout.write(`${name} (${target}):\n`);
  const assets = Object.keys(stats.compilation.assets).filter((_) => !_.endsWith("d.ts"));
  for (const asset of assets) {
    const webpackAsset: any = stats.compilation.assets[asset];
    const size: number = webpackAsset.size
      ? webpackAsset.size()
      : webpackAsset.children
      ? webpackAsset.children[0]._value.length
      : webpackAsset._value.length;
    const strSize = (size / 1024).toFixed(2);
    process.stdout.write(
      `  ${chalk.green.italic(path.join(out!, asset))} (${strSize} Kb)\n`,
    );
  }
  process.stdout.write("\n");
}

function printColoredStats(
  stat: number,
  name: string,
  errorChulk: chalk.Chalk = chalk.red,
): void {
  const type = stat > 0 ? errorChulk : chalk.green;

  process.stdout.write(type(`${stat} ${name}`));
  process.stdout.write(type(stat === 1 ? "" : "s"));
}

function printSummary(errors: TsError[], warnings: TsError[], elapsed: number): void {
  process.stdout.write(`========== ${chalk.bold("Build")}: `);
  printColoredStats(warnings.length, "Warning", chalk.yellow);
  process.stdout.write(", ");
  printColoredStats(errors.length, "Error");
  process.stdout.write(` ${chalk.bold("Time")}: ${chalk.green(elapsed)} ms`);
  process.stdout.write(" ========== \n");
}

export function printResults(
  err: Error | undefined,
  stats: Stats | undefined,
  printAssets = true,
): void {
  process.stdout.write("\n");

  if (!stats) {
    process.stdout.write(`${chalk.red("Compilation failed!!!")}`);
    if (err) process.stdout.write(`Error: ${err.message}`);

    return;
  }

  if (printAssets) {
    printFiles(stats, "Assets");
  }

  const errors: TsError[] = stats.compilation.errors.concat(stats.compilation.errors);
  const warnings: TsError[] = stats.compilation.warnings.concat(
    stats.compilation.warnings,
  );
  // print only from server
  printWarnings(warnings);
  printErrors(errors);
  printSummary(errors, warnings, stats.endTime - stats.startTime);
  process.stdout.write("\n");
}

let lastHash: { [key: string]: string } = {};

export function printIncrementalResults(
  err: Error | undefined,
  stats: Stats | undefined,
): void {
  if (!stats) {
    process.stdout.write(`${chalk.red("Compilation failed!!!")}`);
    if (err) process.stdout.write(`Error: ${err.message}`);

    return;
  }

  process.stdout.write("\n");

  if (stats.hash === lastHash[stats.compilation.name]) return;

  const elapsed = stats.endTime - stats.startTime;
  if (!stats.hasErrors() && !stats.hasWarnings() && lastHash[stats.compilation.name]) {
    process.stdout.write(`Done in ${elapsed} ms\n`);
    lastHash[stats.compilation.name] = stats.hash;
    return;
  }
  
  lastHash[stats.compilation.name] = stats.hash;
  const errors: TsError[] = stats.compilation.errors.concat(stats.compilation.errors);
  const warnings: TsError[] = stats.compilation.warnings.concat(
    stats.compilation.warnings,
  );
  printWarnings(warnings);
  printErrors(errors);
  printSummary(errors, warnings, elapsed);
  process.stdout.write("\n");
}

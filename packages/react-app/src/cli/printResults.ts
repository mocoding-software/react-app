import chalk from "chalk";
import * as path from "path";
import { Stats } from "webpack";

interface MultiStats {
  stats: Stats[];
}

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
  const target = stats.compilation.outputOptions.library.type;
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
      `  ${chalk.green.italic(path.join(out, asset))} (${strSize} Kb)\n`,
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

function printSummary(errors: TsError[], warnings: TsError[], name: string): void {
  process.stdout.write(`========== ${chalk.bold(name)}: `);
  printColoredStats(warnings.length, "Warning", chalk.yellow);
  process.stdout.write(", ");
  printColoredStats(errors.length, "Error");
  process.stdout.write(" ========== \n");
}

export function printResults(
  err: Error,
  multiStats: MultiStats,
  printAssets = true,
): void {
  process.stdout.write("\n");

  if (printAssets) {
    printFiles(multiStats.stats[0], "Client");
    printFiles(multiStats.stats[1], "Server");
  }

  const errors: TsError[] = multiStats.stats[0].compilation.errors.concat(
    multiStats.stats[1].compilation.errors,
  );
  const warnings: TsError[] = multiStats.stats[0].compilation.warnings.concat(
    multiStats.stats[1].compilation.warnings,
  );
  // print only from server
  printWarnings(warnings);
  printErrors(errors);
  printSummary(errors, warnings, "Build");
  process.stdout.write("\n");
}

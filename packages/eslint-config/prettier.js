module.exports = {
  useTabs: false,
  printWidth: 90,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "all",
  noSemi: true,
  bracketSpacing: true,
  endOfLine: "auto",
  overrides: [
    {
      files: "*.ts",
      options: {
        parser: "typescript",
      },
    },
  ],
};

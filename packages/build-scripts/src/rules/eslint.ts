import webpack from "webpack";
export const eslint: webpack.RuleSetRule = {
  test: /\.(ts|tsx)?$/,
  use: "eslint-loader",
  exclude: /node_modules/,
};

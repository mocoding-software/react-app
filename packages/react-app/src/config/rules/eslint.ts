import webpack from "webpack";
export const eslint: webpack.Rule = {
  test: /\.(ts|tsx)?$/,
  use: "eslint-loader",
  exclude: /node_modules/,
};

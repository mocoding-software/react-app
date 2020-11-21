import webpack from "webpack";

function createFaviconRule(emitFile = true): webpack.RuleSetRule {
  return {
    test: /\.(ico|png|webmanifest)$/,
    include: (path) => path.indexOf("favicon") > 0,
    use: {
      loader: "file-loader",
      options: {
        emitFile,
        name: "[name].[ext]",
      },
    },
  };
}

export const favicon = createFaviconRule();
export const noFavicon = createFaviconRule(false);

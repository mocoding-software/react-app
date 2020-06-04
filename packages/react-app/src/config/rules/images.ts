import webpack from "webpack";

function createImagesRule(emitFile = true): webpack.Rule {
  return {
    test: /\.(png|jpg|gif)$/,
    exclude: (path) => path.indexOf("favicon") > 0,
    use: {
      loader: "url-loader",
      options: {
        emitFile,
        limit: 4096,
        name: "img/[name].[contenthash:6].[ext]",
      },
    },
  };
}

export const images = createImagesRule();
export const noImages = createImagesRule(false);

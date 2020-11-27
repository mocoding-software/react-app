import * as path from "path";
import * as webpack from "webpack";

export class Dll {
  private metadataPath: string;

  constructor(
    outputPath: string,
    private dllName: string,
    private sourceType: "commonjs2" | "umd",
  ) {
    this.metadataPath = path.join(outputPath, dllName + ".metadata.json");
  }

  public produce(): webpack.DllPlugin {
    return new webpack.DllPlugin({
      context: path.resolve(__dirname, "../../.."),
      name: this.dllName,
      path: this.metadataPath,
    });
  }

  public consume(): webpack.DllReferencePlugin {
    return new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, "../../.."),
      manifest: require(this.metadataPath),
      name: this.sourceType === "umd" ? this.dllName : "./" + this.dllName,
      sourceType: this.sourceType,
    });
  }
}

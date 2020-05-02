export interface CliOptions {
  version: string;
  production: boolean;
  analyze: boolean;
  config?: string;
}

export interface AppOptions extends CliOptions {
  appEntry: string;
  bootstrapModule: string;
  outputClientPath: string;
  outputServerPath: string;
  // devApiUrl: string;
}

export const DefaultAppOption: AppOptions = {
  analyze: false,
  appEntry: ".",
  bootstrapModule: "@mocoding/react-app-basic",
  outputClientPath: "./wwwroot",
  outputServerPath: "./wwwroot_node",
  production: false,
  version: "0.0.0",
};

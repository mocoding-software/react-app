export interface CliOptions {
  version: string;
  production: boolean;
  analyze: boolean;
  config?: string;
}

export interface AppOptions extends CliOptions {
  clientEntry: string;
  serverEntry: string;
  bootstrapModule: string;
  outputClientPath: string;
  outputServerPath: string;
  // devApiUrl: string;
}

export const DefaultAppOption: AppOptions = {
  analyze: false,
  clientEntry: "./src/frontend",
  serverEntry: "./src/backend",
  bootstrapModule: "@mocoding/react-app-basic",
  outputClientPath: "./build/public",
  outputServerPath: "./build",
  production: false,
  version: "0.0.0",
};

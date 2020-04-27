export interface Settings {
  outputClientPath: string;
  outputServerPath: string;
  bootstrapModule: string;
  appModule: string;

  flavor: "basic" | "router-redux" | "router-redux-async";
  ssrModule?: string;
  extend?: ExtendConfigSettings;
  devApiUrl: string;
  type: string;
}

export interface ExtendConfigSettings {
  serverConfig?: string;
  clientConfig?: string;
}

export const defaultSettings: Settings = {
  outputClientPath: "./wwwroot",
  outputServerPath: "./wwwroot_node",  
  bootstrapModule: "@mocoding/react-app-basic",
  appModule: "",
  flavor: "basic",
  ssrModule: null,
  extend: null,
  devApiUrl: "http://localhost:5000",
  type: "module"
}

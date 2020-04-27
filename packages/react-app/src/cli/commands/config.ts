import program from "commander";
import { defaultSettings, Settings, createConfigs } from "../../config";
// import * as fs from "fs";
// import * as path from "path";

function config(appModule: string) {
  const settings: Partial<Settings> = {    
  }

  const mergedSettings: Settings = {
    ...defaultSettings,
    ...settings
  }

  const configs = createConfigs(mergedSettings)
}

program.command("config [appModule]").action(config);

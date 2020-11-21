declare module "injected-server" {
  import express from "express";
  type ConfigureServerFunc = (webApp: express.Express) => void
  const configureWebApp: ConfigureServerFunc;
  export = configureWebApp;
}

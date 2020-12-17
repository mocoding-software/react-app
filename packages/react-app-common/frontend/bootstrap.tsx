import * as React from "react";
import * as ReactDOM from "react-dom";
//import loadable from "@loadable/component";
import { AppProps, Context, ContextFactoryFunc } from "../common";

export function bootstrap(
  App: React.ComponentType<AppProps>,
  createContext: ContextFactoryFunc,
) {
  // const App = loadable(() => import("injected-bootstrap-module"));

  const context: Context = createContext();
  const element = document.getElementById("app");

  ReactDOM.hydrate(<App context={context} />, element);
}

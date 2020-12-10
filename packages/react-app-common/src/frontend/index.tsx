import * as React from "react";
import * as ReactDOM from "react-dom";
//import loadable from "@loadable/component";
import { Context } from "../common";

// const App = loadable(() => import("injected-bootstrap-module"));

import { createContext, App } from "injected-bootstrap-module";

const context: Context = createContext();
const element = document.getElementById("app");

ReactDOM.hydrate(<App context={context} />, element);

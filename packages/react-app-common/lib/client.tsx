import * as React from "react";
import * as ReactDOM from "react-dom";
import { Context } from "./common";

import { createContext, App } from "injected-bootstrap-module";

const context: Context = createContext();
const element = document.getElementById("app");

ReactDOM.hydrate(<App context={context} />, element);

declare module "@mocoding/react-app-router-redux/middlewares" {
  import { Middleware } from "redux";
  const middlewares: Middleware[];
  export default middlewares;
}

declare module "injected-app-entry/store" {
  import { Middleware, Reducer } from "redux";
  export const middlewares: Middleware[];
  export const reducers: Reducer[];
  export const onParseInitialState: (state: string) => unknown;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "injected-bootstrap-module" {
  import { AppProps, ContextFactoryFunc } from "@mocoding/react-app-common";
  const createContext: ContextFactoryFunc;
  const App: React.ComponentType<AppProps>;
}

// TODO: Once Node 13.2+ is there this can be changed to "injected-bootstrap-module/render"
// I don't like specific assumptions that bootstrap module contains lib folder.
declare module "injected-bootstrap-module/lib/render" {
  import { RenderFunc } from "@mocoding/react-app-common";
  const render: RenderFunc;
}

declare module "injected-bootstrap-module/lib/middlewares" {
  import { RenderFunc } from "@mocoding/react-app-common";
  const render: RenderFunc;
}

declare module "injected-app-entry" {
  import { AppProps } from "@mocoding/react-app-common";
  export const App: React.ComponentType<AppProps>;
}

declare module "@mocoding/react-app-common/lib/entry" {
  const HmrProxyEntryModule: React.ComponentType;
  export = HmrProxyEntryModule;
}

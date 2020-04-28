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
  const createContext: ContextFactoryFunc;
  const App: React.ComponentType<AppProps>;
}

// TODO: Once Node 13.2+ is there this can be changed to "injected-bootstrap-module/render"
// I don't like specific assumptions that bootstrap module contains lib folder.
declare module "injected-bootstrap-module/lib/render" {
  const render: RenderFunc;
}

declare module "injected-app-entry" {
  export const App: React.ComponentType<AppProps>;
}

declare module "injected-hmr-entry" {
  const EntryPoint: React.ComponentType<AppProps>;
  export = EntryPoint;
}

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
  const render: RenderFunc;
}

declare module "injected-app-entry" {  
  const EntryPoint: React.ComponentType<AppProps>;
  export = EntryPoint
}

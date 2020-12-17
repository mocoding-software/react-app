export interface Context {
  helmetContext?: any;
  store?: any;
  history?: any;
}

export interface AppProps {
  context: Context;
}

export type ContextFactoryFunc = () => Context;

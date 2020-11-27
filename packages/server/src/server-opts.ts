export interface ServerOptions {
  port: number;
  env: string;
  contentPath: string;
  serverTimeout: number;
  shutdownTimeout: number;
}

export const DefaultServerOptions: ServerOptions = {
  port: 3000,
  env: "development",
  contentPath: "public",
  serverTimeout: 15000,
  shutdownTimeout: 5000,
};

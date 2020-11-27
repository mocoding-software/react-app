export interface ServerOptions {
    port: number;
    env: string;
    contentPath: string;
    serverTimeout: number;
    shutdownTimeout: number;
}
export declare const DefaultServerOptions: ServerOptions;

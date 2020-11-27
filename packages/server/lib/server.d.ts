/// <reference types="node" />
import express from "express";
import http from "http";
import { ServerOptions } from "./server-opts";
export declare class Server {
    protected options: ServerOptions;
    app: express.Application;
    constructor(options?: ServerOptions);
    start(): http.Server;
}

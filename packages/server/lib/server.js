"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const server_opts_1 = require("./server-opts");
class Server {
    constructor(options = server_opts_1.DefaultServerOptions) {
        this.options = options;
        this.app = express_1.default();
    }
    start() {
        const { port, env, serverTimeout, shutdownTimeout } = this.options;
        const server = this.app.listen(this.options.port, () => {
            process.stdout.write(`App is running at http://localhost:${port} in ${env} mode\n`);
            process.stdout.write(" Press CTRL-C to stop\n");
        });
        server.setTimeout(serverTimeout);
        process.on("SIGTERM", () => {
            server.close(() => {
                process.exit(0);
            });
            setTimeout(() => {
                process.exit(0);
            }, shutdownTimeout);
        });
        process.on("unhandledRejection", (reason, promise) => {
            process.stdout.write(`Unhandled Promise Rejection ${reason}, ${promise}`);
            process.exit(1);
        });
        process.on("uncaughtException", (error) => {
            process.stdout.write(`Caught exception: ${error}\n`);
            process.exit(1);
        });
        return server;
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map
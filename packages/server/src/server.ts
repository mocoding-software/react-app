import express from "express";
import http from "http";
import { DefaultServerOptions, ServerOptions } from "./server-opts";

export class Server {
  public app: express.Application;

  constructor(protected options: ServerOptions = DefaultServerOptions) {
    this.app = express();
  }

  public start(): http.Server {
    const { port, env, serverTimeout, shutdownTimeout } = this.options;
    const server = this.app.listen(this.options.port, () => {
      process.stdout.write(`App is running at http://localhost:${port} in ${env} mode\n`);
      process.stdout.write(" Press CTRL-C to stop\n");
    });

    // Set the server to timeout after 15 seconds
    server.setTimeout(serverTimeout);

    // Gracefully shutdown the server on SIGTERM.
    process.on("SIGTERM", () => {
      server.close(() => {
        process.exit(0);
      });

      setTimeout(() => {
        process.exit(0);
      }, shutdownTimeout);
    });

    // The application is in an undefined state after an unhandled promise rejection. Log the error
    // and exit.
    process.on("unhandledRejection", (reason, promise) => {
      process.stdout.write(`Unhandled Promise Rejection ${reason}, ${promise}`);
      process.exit(1);
    });

    // If we want to also get the origin, we need to upgrade node version to at least 12.17.0
    // See: https://nodejs.org/api/process.html#process_event_uncaughtexception
    process.on("uncaughtException", (error) => {
      process.stdout.write(`Caught exception: ${error}\n`);
      process.exit(1);
    });

    return server;
  }
}

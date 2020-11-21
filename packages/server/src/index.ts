import express from "express";

import configureWebApp from "injected-server";

// create express application
const webApp = express(); // createApp(config);

configureWebApp(webApp);

// start server
const port = 3000;
const env = "development";
const server = webApp.listen(port, () => {
  process.stdout.write(`App is running at http://localhost:${port} in ${env} mode\n`);
  process.stdout.write(" Press CTRL-C to stop\n");
});

// Set the server to timeout after 15 seconds
server.setTimeout(15000);

// Gracefully shutdown the server on SIGTERM.
process.on("SIGTERM", () => {
  server.close(() => {
    process.exit(0);
  });

  setTimeout(() => {
    process.exit(0);
  }, 5000);
});

// The application is in an undefined state after an unhandled promise rejection. Log the error
// and exit.
process.on("unhandledRejection", (reason, promise) => {
  process.stdout.write(`Unhandled Promise Rejection ${reason}, ${promise}`);
  process.exit(1);
});

// If we want to also get the origin, we need to upgrade node version to at least 12.17.0
// See: https://nodejs.org/api/process.html#process_event_uncaughtexception
process.on("uncaughtException", (error, origin) => {
  process.stdout.write(`Caught exception: ${error}\nException origin: ${origin}`);
  process.exit(1);
});

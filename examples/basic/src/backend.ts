import { Server } from "@mocoding/server";

const server = new Server();

server.app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

server.start();

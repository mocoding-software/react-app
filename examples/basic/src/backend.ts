import * as express from "express";

function configureWebApp(app: express.Express) {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
}

export default configureWebApp;

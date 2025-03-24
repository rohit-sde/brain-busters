import bodyParser from "body-parser";
import express from "express";
import { CONFIG } from "./config.mjs";
import { router } from "./routes.mjs";
import path from "path";

const app = express();

app.use(
  "/api",
  ...[
    bodyParser.json(),
    (req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      next();
    },
    router,
    (req, res) => {
      if (req.method === "OPTIONS") {
        return res.sendStatus(200);
      }

      res.status(404).json({ message: "Not found" });
    },
  ]
);

app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.listen(CONFIG.port, CONFIG.host, () => {
  console.info(`Server is running at http://${CONFIG.host}:${CONFIG.port}`);
});

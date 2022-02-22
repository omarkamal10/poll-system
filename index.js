import { userRoutes, pollRoutes } from "./src/interface/routes";
import cachingClient from "./src/interface/caching";
import Socket from "./src/socket";
import { DatabaseConnection } from "./src/infrastructure/database";
import express from "express";
import cors from "cors";
import Config from "./config";

const app = express();
const http = require("http");
const server = http.createServer(app);

DatabaseConnection.authenticate().then(async () => {
  console.log(`Successfully connected to poll database`);

  cachingClient.on("error", (err) => {
    throw err;
  });
  console.log(`Successfully connected to caching client`);

  Socket.setup(server);
});

app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/polls", pollRoutes);

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

server.listen(Config.Port, () =>
  console.log(`Server listening on port ${Config.Port}`)
);

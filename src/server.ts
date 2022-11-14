import express, { response } from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import cityRoutes from "./routes/CitiesRouter";

const router = express();

/* Mongo connection */

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Connected to MongoDB");
    startServer();
  })
  .catch((err) => {
    Logging.error("Unable to connect: ");
    Logging.error(err);
  });

/**/
const startServer = () => {
  router.use((req, res, next) => {
    Logging.info(
      `Method: [${req.method}] - Url [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );
    res.on("finish", () => {
      /* Logging the response */
      Logging.info(
        `Method: [${req.method}] - Url [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });
    next();
  });
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /* Rules of our API */
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Origin",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }
    next();
  });

  /* Routes */

  router.use("/cities", cityRoutes);

  /* Check */

  router.get("/ding", (req, res, next) => {
    res.status(200).json({ message: "dong" });
  });
  /* Error Handling */
  router.use((req, res, next) => {
    const error = new Error("Not Found");
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });
  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}.`)
    );
};

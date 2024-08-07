import cors from "cors";
import express, { Express } from "express";

import routes from "routes";

import { MESSAGES } from "consts";

import { ROUTE_VERSION } from "config";

import { Logger } from "utils";
import { errorMiddleware } from "middlewares";

const port = process.env.PORT || 8000;

export const backendSetup = async () => {
  const app: Express = express();

  // middlewares
  app.use(cors());
  app.use(express.json());

  // routes
  app.use(`/api/${ROUTE_VERSION}/`, routes);

  // error handling middleware
  app.use(errorMiddleware);

  app.listen(port, () => {
    Logger.info(MESSAGES.SERVER.STARTING_SUCCESS);
  });
};

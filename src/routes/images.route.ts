import express from "express";

import { imagesController } from "controllers";
import { uploader } from "utils";

const imagesRouter = express.Router();

imagesRouter.post(
  "/upload",
  uploader.single("image"),
  imagesController.uploadImageValidator(),
  imagesController.uploadImageHandler
);

export { imagesRouter };

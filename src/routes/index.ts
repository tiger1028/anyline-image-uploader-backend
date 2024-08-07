import express from "express";

import { imagesRouter } from "./images.route";

const router = express.Router();

router.use("/images", imagesRouter);

export default router;

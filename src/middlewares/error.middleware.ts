import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { CustomError } from "errors";
import { Logger } from "utils";
import { MulterError } from "multer";
import { MESSAGES } from "consts";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  Logger.error(error);

  if (error instanceof CustomError) {
    return res.status(error.errorCode).json({
      message: error.message,
      reason: error.reasonCode,
    });
  }

  if (error instanceof MulterError) {
    // Handle Multer errors here
    if (error.code === "LIMIT_FILE_SIZE") {
      return res
        .status(413)
        .json({ message: MESSAGES.IMAGES.TOO_LARGE_IMAGE_FILE });
    }
    return res
      .status(500)
      .json({ message: MESSAGES.IMAGES.IMAGE_UPLOAD_SUCCESSFULLY_FAILED });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    message: (error as Error).message,
  });
};

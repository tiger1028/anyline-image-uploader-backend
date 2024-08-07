import { CustomError } from "errors";
import { NextFunction, Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";
import httpStatus from "http-status";

export const errorHandlerWrapper = (
  func: (req: Request, res: Response, next: NextFunction) => void
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError(
          "Invalid Arguments",
          httpStatus.BAD_REQUEST,
          errors
            .array()
            .map((value: ValidationError) => value.msg)
            .join(" | ")
        );
      }

      await func(req, res, next);
    } catch (err: any) {
      next(err);
    }
  };
};

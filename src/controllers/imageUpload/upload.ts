import { MESSAGES } from "consts";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "utils";
import randomstring from "randomstring";

export const uploadImageValidator = () => {
  return [];
};

export const uploadImage = async (req: Request, res: Response) => {
  const randomStatus = Math.random() * 10 < 5;

  if (randomStatus) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: MESSAGES.IMAGES.GET_OCR_FAILED });
  }

  const data = randomstring.generate();

  return res.status(httpStatus.OK).json({ data });
};

export const uploadImageHandler = errorHandlerWrapper(uploadImage);

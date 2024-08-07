import { MESSAGES } from "consts";
import { CustomError } from "errors";
import httpStatus from "http-status";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, "uploads/");
  },
  filename: (req, file, next) => {
    next(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploader = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter: (req, file, next) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
      // File extensions does not match
      return next(
        new CustomError(
          MESSAGES.IMAGES.UNSUPPORTED_FILE_TYPE,
          httpStatus.BAD_REQUEST
        )
      );
    }

    next(null, true); // Accept the file
  },
});

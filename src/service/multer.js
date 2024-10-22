import multer from "multer";
import path from "path";
import fs from "fs";
import { AppError } from "../../utils/AppError.js";
import mongoose from "mongoose";




export const multerLocal = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, new mongoose.Types.ObjectId() + path.extname(file.originalname));
    }
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      return cb(null, true);
    }
    return cb(new AppError("Invalid file type, please upload images only", 400), false);
  }

  const upload = multer({ fileFilter, storage });
  return upload;
};

export const uploadImage = (fieldName) => multerLocal().single(fieldName);

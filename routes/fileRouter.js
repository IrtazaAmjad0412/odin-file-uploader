import express from "express";
import {
  renderFileList,
  renderFileForm,
  createFile,
  downloadFile,
} from "../controllers/fileController.js";
import { ensureAuthenticated } from "../controllers/authController.js";
import { upload } from "../lib/multer.js";

export const itemRouter = express.Router({ mergeParams: true });

itemRouter.get("/", ensureAuthenticated, renderFileList);
itemRouter.get("/new", ensureAuthenticated, renderFileForm);
itemRouter.post("/new", ensureAuthenticated, upload.single("file"), createFile);
itemRouter.get("/:id/download", ensureAuthenticated, downloadFile);

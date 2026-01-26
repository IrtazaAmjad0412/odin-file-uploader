import express from "express";
import {
  renderFolderForm,
  createFolder,
  renderFolderDetails,
  renderEditFolderForm,
  editFolder,
  deleteFolder,
} from "../controllers/folderController.js";
import { ensureAuthenticated } from "../controllers/authController.js";
import { folderValidation } from "../validators/folderValidators.js";

export const folderRouter = express.Router();

folderRouter.get("/new", ensureAuthenticated, renderFolderForm);
folderRouter.post("/new", ensureAuthenticated, folderValidation, createFolder);
folderRouter.get("/:id", ensureAuthenticated, renderFolderDetails);
folderRouter.get("/:id/edit", ensureAuthenticated, renderEditFolderForm);
folderRouter.post("/:id/edit", ensureAuthenticated, folderValidation, editFolder);
folderRouter.post("/:id/delete", ensureAuthenticated, deleteFolder);

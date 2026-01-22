import express from "express";
import { renderHomepage } from "../controllers/homepageController.js";

export const homepageRouter = express.Router();

homepageRouter.get("/", renderHomepage);

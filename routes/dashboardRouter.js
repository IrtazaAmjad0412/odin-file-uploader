import express from "express";
import { renderDashboard } from "../controllers/dashboardController.js";
import { ensureAuthenticated } from "../controllers/authController.js";

export const dashboardRouter = express.Router();

dashboardRouter.get("/", ensureAuthenticated, renderDashboard);

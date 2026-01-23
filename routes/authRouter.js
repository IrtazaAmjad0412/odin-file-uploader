import express from "express";
import { renderLoginForm } from "../controllers/authController.js";

export const authRouter = express.Router();

authRouter.get("/login", renderLoginForm);

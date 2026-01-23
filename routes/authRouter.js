import express from "express";
import { renderLoginForm, loginUser, logoutUser } from "../controllers/authController.js";
import { loginValidation } from "../validators/authValidators.js";

export const authRouter = express.Router();

authRouter.get("/login", renderLoginForm);
authRouter.post("/login", loginValidation, loginUser);
authRouter.post("/logout", logoutUser);

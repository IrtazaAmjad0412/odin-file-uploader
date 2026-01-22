import express from "express";
import { renderSignupForm, createUser } from "../controllers/userController.js";
import { signupValidation } from "../validators/userValidators.js";

export const userRouter = express.Router();

userRouter.get("/signup", renderSignupForm);
userRouter.post("/signup", signupValidation, createUser);

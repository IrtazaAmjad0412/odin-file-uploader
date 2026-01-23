import { body } from "express-validator";

export const loginValidation = [
  body("email")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  body("password").isString().notEmpty().withMessage("Password is required"),
];

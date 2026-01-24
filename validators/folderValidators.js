import { body } from "express-validator";

export const folderValidation = [
  body("name").isString().trim().notEmpty().withMessage("Name is required"),
];

import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { prisma } from "../lib/prisma.js";

export const renderSignupForm = (req, res) => {
  try {
    res.render("signupForm");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signupForm", {
        errors: errors.mapped({ onlyFirstError: true }),
        oldInput: req.body,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
    res.redirect("/");
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(400).render("signupForm", {
        errors: { email: { msg: "Email already exists" } },
        oldInput: req.body,
      });
    }
    console.error(err);
    res.status(500).send("Server Error");
  }
};

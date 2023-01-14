import User from "../models/User.js";
import { body } from "express-validator";

const register = [
  body("email").isEmail().withMessage("Invalid email."),
  body("email").custom(async (email) => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw new Error("Email already in use");
    }
  }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
];

const login = [
  body("email").exists().withMessage("Please provide an email address."),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string"),
];

export default {
  register,
  login,
};

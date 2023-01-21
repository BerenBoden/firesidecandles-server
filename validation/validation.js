import { body } from "express-validator";

const register = [
  body("email").isEmail().withMessage("Invalid email."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
];

const login = [
  body("email").exists().withMessage("Please provide an email address."),
  body("password")
    .exists()
    .withMessage("Password is required")
];

export default {
  register,
  login,
};

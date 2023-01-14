import { validationResult } from "express-validator";
import axios from "axios";
import Strapi from "strapi-sdk-js";

const strapi = new Strapi({
  url: process.env.API_URL,
  prefix: "/api",
  store: {
    key: "strapi_jwt",
    useLocalStorage: false,
    cookieOptions: { path: "/" },
  },
  axiosOptions: {},
});

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = {};
      err.message = errors.array().map((error) => error.msg);
      next(err);
      return;
    }

    const { email, username } = req.body;
    try {
      await axios.post(`${process.env.API_URL}/api/auth/local/register`, {
        username,
        email,
        password: req.body.password,
      });
    } catch (err) {
      throw new Error(err);
    }
    res.json({ message: "Registered successfully!" });
    next();
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = {};
      err.message = errors.array().map((error) => error.msg);
      next(err);
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/api/auth/local`,
        {
          identifier: email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { role } = await strapi.request("get", "/users/me", {
        params: {
          populate: ["role"],
        },
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      });

      res.json({
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        token: data.jwt,
        role: role.type,
        refreshToken: data.refreshToken,
      });
    } catch (err) {
      throw new Error("Email or password is incorrect.");
    }
  } catch (err) {
    next(err);
  }
};

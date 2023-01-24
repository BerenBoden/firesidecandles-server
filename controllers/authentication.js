import { validationResult } from "express-validator";
import axios from "axios";
import { createStrapi } from "../config/strapi.js";
import RefreshUser from "../models/RefreshUser.js";
import {API_URL} from "../index.js";

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
      await axios.post(`${API_URL}/api/auth/local/register`, {
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
  const strapi = await createStrapi();
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = {};
      err.message = errors.array().map((error) => error.msg);
      next(err);
      return;
    }

    const data = await strapi.request("post", "/auth/local", {
      data: {
        identifier: email,
        password,
      }
    });
    // const { role } = await strapi.request("get", "/users/me", {
    //   params: {
    //     populate: ["role"],
    //   },
    //   headers: {
    //     Authorization: `Bearer ${data.jwt}`,
    //   },
    // });

    await RefreshUser.findOneAndUpdate(
      { userId: data.user.id },
      { refreshToken: data.refreshToken },
      { upsert: true, new: true }
    );

    res.json({
      id: data.user.id,
      username: data.user.username,
      email: data.user.email,
      token: data.jwt,
      // role: role.type,
    });
  } catch (err) {
    err.error.message = "Invalid email or password.";
    next(err);
  }
};

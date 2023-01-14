import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { validationResult } from "express-validator";
import axios from "axios";
import Strapi from "strapi-sdk-js";

const strapi = new Strapi({
  url: "http://localhost:1337",
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

    const { email, name } = req.body;
    try {
      const auth = await axios.post(
        `${process.env.API_URL}/api/auth/local/register`,
        {
          username: name,
          email: email,
          password: req.body.password,
        }
      );
      console.log(auth.data);
    } catch (err) {
      console.log(err.message);
    }

    const user = new User({
      email,
      name,
    });

    const hashedPassword = await hashPassword(req.body.password);
    user.password = hashedPassword;

    await user.save();
    res.json({ message: "Registered successfully!" });
    next();
  } catch (err) {
    err.message = "Unable to register user.";
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

    const user = await User.findOne({ email });

    if (user && (await comparePassword(password, user.password))) {
      try {

        const auth = await strapi.request("post", "/auth/local", {
          data: {
            identifier: user.email,
            password: password,
          },
        });
        // const {role} = await strapi.request("get","/users/me", {
        //   params: {
        //     populate: ['role']
        //   },  
        //   headers: {
        //     Authorization: `Bearer ${auth.jwt}`,
        //   }
        // })

        
        res.json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: auth.jwt,
          // role: role.type,
          refreshToken: auth.refreshToken,
        });
      } catch (err) {
        console.log(err)
        throw new Error(err);
      }
    } else {
      res.status(400);
      
      throw new Error("Email or password is incorrect.");
    }
  } catch (err) {
    console.log('sdfs')
    next(err);
  }
};

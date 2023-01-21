import express from "express";
import RefreshUser from "../models/RefreshUser.js";
import axios from "axios";

const router = express.Router();

router.route("/").post(async (req, res, next) => {
  const { userId } = req.body;
  const { refreshToken } = await RefreshUser.findOne({userId})
  try {
    const data = await axios.post(`${process.env.API_URL}/api/token/refresh`, {
        refreshToken: refreshToken,
    })

    RefreshUser.findOneAndUpdate(
      { userId },
      { refreshToken: data.data.refreshToken },
      { new: true }
    );
    
    res.send({data: data.data.jwt});
  } catch (err) {
    err.error = {status: 401};
    next(err);
  }
});

export default router;

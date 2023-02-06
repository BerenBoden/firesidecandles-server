import { createStrapi } from "../config/strapi.js";
import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";
import { API_URL } from "../index.js";

export const getArticles = async (req, res, next) => {
  const strapi = await createStrapi();
    const { start, limit } = req.query;
  try {
    const data = await strapi.find("articles", {
      pagination: {
        start,
        limit,
      },
      populate: [
        "image_header",
        "article_categories",
        "article_tags",
        "author",
      ],
    });
    res.send(data);
  } catch (err) {
    next(err);
  }
};

export const getArticleById = async (req, res, next) => {
  const strapi = await createStrapi();
  try {
    const data = await strapi.findOne("articles", req.params.id, {
      populate: [
        "image_header",
        "article_categories",
        "article_tags",
        "author",
      ],
    });
    res.send(data);
  } catch (err) {
    next(err);
  }
};

export const postArticle = async (req, res, next) => {
  const image_header = req.file;
  const fileStream = fs.createReadStream(image_header.path);
  console.log(req.body.data)
  const formData = new FormData();

  try {
    formData.append("data", req.body.data);
    formData.append("files.image_header", fileStream, {
      filename: image_header.originalname,
      contentType: image_header.mimetype,
    });
    const { data } = await axios.post(`${API_URL}/api/articles`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${req.headers.authorization}`,
      },
    });
    fs.unlink(image_header.path, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Successfully deleted ${image_header.path}`);
      }
    });
    res.send(data);
  } catch (err) {
    next(err);
  }
};

export const updateArticle = async (req, res, next) => {
  let fileStream;
  const image_header = req.file;
  const formData = new FormData();
  console.log(req.body.data)
  formData.append("data", req.body.data);

  if (image_header) {
    fileStream = fs.createReadStream(image_header.path);
    formData.append("files.image_header", fileStream, {
      filename: image_header.originalname,
      contentType: image_header.mimetype,
    });
  }

  try {
    const { data } = await axios.put(
      `${API_URL}/api/articles/${req.params.id}`,
      formData,
      {
        headers: {
          Authorization: `${req.headers.authorization}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (image_header) {
      fs.unlink(image_header.path, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Successfully deleted ${image_header.path}`);
        }
      });
    }

    res.send(data);
  } catch (err) {
    next(err);
  }
};

export const deleteArticle = async (req, res, next) => {
  const strapi = await createStrapi();
  strapi.axios.defaults.headers.common[
    "Authorization"
  ] = `${req.headers.authorization}`;
  try {
    const data = await strapi.delete("articles", req.url.split("/")[1]);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

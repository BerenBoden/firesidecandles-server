import { createStrapi } from "../config/strapi.js";
import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";
import {API_URL} from "../index.js";

export const getArticles = async (req, res, next) => {
  const strapi = await createStrapi();
  try {
    const data = await strapi.find("articles", { 
      populate: ["image_header", "article_categories", "article_tags", "author"],
    });
    res.send(data);
  }catch(err){
    next(err)
  }
};

export const getArticleById = async (req, res, next) => {
  const strapi = await createStrapi();
  console.log(req.params.id)
  try {
    const data = await strapi.findOne("articles", req.params.id, {
      populate: ["image_header", "article_categories", "article_tags", "author"],
    })
    res.send(data)
  }catch(err){
    next(err)
  }
}

export const postArticle = async (req, res, next) => {
  const image_header = req.file;
  const fileStream = fs.createReadStream(image_header.path);
  
  const formData = new FormData();
  console.log(req.body.data)
  formData.append("data", req.body.data);
  formData.append("files.image_header", fileStream, {
    filename: image_header.originalname,
    contentType: image_header.mimetype,
  });

  try {
    const { data } = await axios.post(
      `${API_URL}/api/articles`,
      formData,
      {
        headers: {
          Authorization: `${req.headers.authorization}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
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
  // const image_header = req.file;
  // const fileStream = fs.createReadStream(image_header.path);
  
  // const formData = new FormData();
  // console.log(req.body.data)
  // formData.append("data", req.body.data);
  // formData.append("files.image_header", fileStream, {
  //   filename: image_header.originalname,
  //   contentType: image_header.mimetype,
  // });

  // try {
  //   const { data } = await axios.post(
  //     `${API_URL}/api/articles`,
  //     formData,
  //     {
  //       headers: {
  //         Authorization: `${req.headers.authorization}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //   );
  //   fs.unlink(image_header.path, (err) => {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       console.log(`Successfully deleted ${image_header.path}`);
  //     }
  //   });
  //   res.send(data);
  // } catch (err) {
  //   next(err);
  // }
  console.log('dfh')
}
import { createStrapi } from "../config/strapi.js";

export const getProducts = async (req, res, next) => {
  const strapi = await createStrapi();
  const { start, limit } = req.query;

  try {
    const data = await strapi.find("products", {
      pagination: {
        start,
        limit,
      },
      populate: ["product_categories", "product_tags", "image_header"],
    });
    res.send(data);
  } catch (err) {
    next(err);
  }
};

export const sortProducts = async (req, res, next) => {
  const strapi = await createStrapi();
  const { sort } = req.query;
  console.log(sort)
  try {
    const response = await strapi.request("get", "/products", {
      params: {
        "filters[slug][$eq]": "product1"
      }
    });
    res.send(response)
  } catch (err) {
    next(err);
  }
};

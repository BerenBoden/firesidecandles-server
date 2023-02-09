import { createStrapi } from "../config/strapi.js";

export const getProducts = async (req, res, next) => {
  const strapi = await createStrapi();
  const { start, limit } = req.query;
  console.log(start, limit)
  try {
    const data = await strapi.find("products", {
      pagination: {
        start,
        limit,
      },
      populate: ["product_categories", "product_tags","image_header"],
    });
    console.log(data)
    res.send(data);
  } catch (err) {
    next(err);
  }
};
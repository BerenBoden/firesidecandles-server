import { createStrapi } from "../config/strapi.js";

export const getCategories = async (req, res, next) => {
  const strapi = await createStrapi();
  try {
    const data = await strapi.find("blog-categories", {
      pagination: {
        start: 0,
        limit: 10,
      },
    });
    res.send(data);
  } catch (err) {
    next(err);
  }
};

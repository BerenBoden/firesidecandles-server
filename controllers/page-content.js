import { createStrapi } from "../config/strapi.js";
import { extractAttributes } from "../utils/extract.js";

export const getHomePage = async (req, res, next) => {
  const strapi = await createStrapi();

  try {
    const data = await strapi.find("home-page", {
      populate: ["featured.image", "hero.image"],
    });
    const featuredImage = extractAttributes(data, "featured", "medium");
    const heroImage = extractAttributes(data, "hero", "large");
    const featuredContent = extractAttributes(data, "featured");
    const heroContent = extractAttributes(data, "hero");
    res.send({featuredImage, heroImage, featuredContent, heroContent})
  } catch (err) {
    next(err);
  }
};

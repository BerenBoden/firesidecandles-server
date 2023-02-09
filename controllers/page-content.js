import { createStrapi } from "../config/strapi.js";

export const getHomePage = async (req, res, next) => {
    const strapi = await createStrapi();
    try {
        const data = await strapi.find("home-page", {
            populate: ["hero_images"]
        });
        res.send(data);
    } catch (err) {
        next(err);
    }
}
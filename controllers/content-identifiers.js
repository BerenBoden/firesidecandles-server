import { createStrapi } from "../config/strapi.js";

export const getIdentifiers = async (req, res, next) => {
  const strapi = await createStrapi();
  const {start, limit, content, identifier} = req.query;
  try {
    const data = await strapi.find(`${content}-${identifier}`, {
      pagination: {
        start,
        limit,
      },
    });
    res.send(data);
  } catch (err) {
    next(err);
  }
}; 

export const deleteIdentifier = async (req, res, next) => {
  const id = req.url.split('/')[1]
  const strapi = await createStrapi();
  strapi.axios.defaults.headers.common["Authorization"] = `${req.headers.authorization}`;
  try {
    const data = await strapi.delete("blog-categories", id);
    res.send(data);
  } catch (err) {
    next(err);
  }
}

export const postIdentifier = async (req, res, next) => {
  const strapi = await createStrapi();
  strapi.axios.defaults.headers.common["Authorization"] = `${req.headers.authorization}`;
  const {name} = req.body;
  try {
    const data = await strapi.create("blog-categories", {name});
    res.send(data);
  }catch(err){
    next(err)
  }
}
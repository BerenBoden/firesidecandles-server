import { createStrapi } from "../config/strapi.js";
import pluralize from "pluralize";

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
  const {content, identifier} = req.query;

  const strapi = await createStrapi();
  strapi.axios.defaults.headers.common["Authorization"] = `${req.headers.authorization}`;
  try {
    const data = await strapi.delete(`${content}-${identifier}`, id);
    res.send(data);
  } catch (err) {
    next(err);
  }
}

export const postIdentifier = async (req, res, next) => {
  const strapi = await createStrapi();
  strapi.axios.defaults.headers.common["Authorization"] = `${req.headers.authorization}`;
  const {content, identifier} = req.query;
  const {name, related} = req.body;

  const relatedContent = `${pluralize.singular(identifier)}_${pluralize(content)}`

  try {
    const data = await strapi.create(`${content}-${identifier}`, {name, [relatedContent]: related});
    res.send(data);
  }catch(err){
    next(err)
  }
}
import { createStrapi } from "../config/strapi.js";
import pluralize from "pluralize";

export const getIdentifiers = async (req, res, next) => {
  const strapi = await createStrapi();
  const {start, limit, content, identifier, related} = req.query;

  try {
    const data = await strapi.find(`${content}-${identifier}`, {
      pagination: {
        start,
        limit,
      },
      populate: [`${related ? `category_${pluralize(content)}.image_header` : ``}`],
    });
    res.send(data);
  } catch (err) {
    next(err);
  }
};

export const getIdentifierById = async (req, res, next) => {
  const strapi = await createStrapi();
  const {content, identifier} = req.query;
  try {
    const data = await strapi.findOne(`${content}-${identifier}`, req.params.id, {
      populate: [`category_${pluralize(content)}`],
    });
    res.send(data);
  } catch (err) {
    next(err);
  }
}

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
  const {name, slug, related, meta_description} = req.body;
  
  try {
    const data = await strapi.create(`${content}-${identifier}`, {name, [`category_${pluralize(content)}`]: related, slug, meta_description});
    res.send(data);
  }catch(err){
    next(err)
  }
}

export const updateIdentifier = async (req, res, next) => {
  const strapi = await createStrapi();
  strapi.axios.defaults.headers.common["Authorization"] = `${req.headers.authorization}`;
  const id = req.url.split('/')[1]
  const {content, identifier} = req.query;
  const {name, related, slug, meta_description} = req.body;
  console.log(slug)
  try {
    const data = await strapi.update(`${content}-${identifier}`, id, {name, [`category_${pluralize(content)}`]: related, slug, meta_description});
    res.send(data);
  }catch(err){
    next(err)
  }
}
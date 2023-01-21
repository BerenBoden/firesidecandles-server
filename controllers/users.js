import {createStrapi} from '../config/strapi.js';

export const getUsers = async (req, res, next) => {
    const strapi = await createStrapi();
    strapi.axios.defaults.headers.common["Authorization"] = `${req.headers.authorization}`;
    try {
        const data = await strapi.find("users");
        res.send(data);
    } catch (err) {
        console.log(err)
        next(err);
    }
}
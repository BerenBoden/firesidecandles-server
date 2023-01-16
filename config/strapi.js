import Strapi from "strapi-sdk-js";

// wraps Strapi constructor in an async function to ensure that env variable is fully loaded before instantiating the object
export const createStrapi = async () => {
  return new Strapi({
    url: process.env.API_URL,
    prefix: "/api",
    axiosOptions: {},
  });
};

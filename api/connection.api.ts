"use server";

const api_key = process.env.API_KEY;
const base_url = process.env.BASE_URL;

export const print = () => {
  console.log("api_key", api_key);
  console.log("base_url", base_url);
};

// export getAllGames = async () => {

// }

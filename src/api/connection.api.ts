"use server";

import axios from "axios";

const api_key = process.env.API_KEY as string;
const base_url = process.env.BASE_URL as string;

const bodyParams = {
  params: {
    key: api_key as string,
    page_size: 1,
  },
};

export const print = (): void => {
  console.log("api_key", api_key);
  console.log("base_url", base_url);
};

export const getAllGames = async () => {
  try {
    const response = await axios.get(`${base_url}games`, bodyParams);
    // the exact data is stored in a object called `results`
    const results = await response.data.results;
    return results;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

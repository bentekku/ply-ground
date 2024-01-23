"use server";

import axios from "axios";

const API_KEY = process.env.API_KEY as string;
const BASE_URL = process.env.BASE_URL as string;

const bodyParams = {
  params: {
    key: API_KEY as string,
    // INFO: the limit for results is 40 by the api itself
    page_size: 111,
    // count: 111, // not sure what this is for, found it on the docs
  },
};

export const print = (): void => {
  console.info("api_key: ", API_KEY, "\nbase_url: ", BASE_URL);
};

export const getAllGames = async () => {
  try {
    const response = await axios.get(`${BASE_URL}games`, bodyParams);
    // the exact data is stored in a object called `results`
    const results = await response.data.results;
    return results;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error: ", error.message);
    }
  }
};

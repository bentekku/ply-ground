"use server";

import { trailer, trailerResult } from "@/types/trailer.types";
import axios from "axios";

const API_KEY = process.env.API_KEY as string;
const BASE_URL = process.env.BASE_URL as string;

const fetchAllBodyParams = {
  params: {
    key: API_KEY as string,
    // INFO: the limit for results is 40 by the api itself
    page_size: 111,
    // count: 111, // not sure what this is for, found it on the docs
  },
};
const fetchOneBodyParams = {
  params: {
    key: API_KEY as string,
  },
};

export const print = (): void => {
  console.info("api_key: ", API_KEY, "\nbase_url: ", BASE_URL);
};

export const getAllGames = async () => {
  try {
    const response = await axios.get(`${BASE_URL}games`, fetchAllBodyParams);
    // the exact data is stored in a object called `results`
    const results = await response.data.results;
    return results;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error: ", error.message);
    }
  }
};

// INFO: Following code is used to get specific game from the API
export const getSpecificGame = async (id: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}games/${id}`,
      fetchOneBodyParams
    );
    // const result = await response.data.results;
    const result = await response.data;
    // const result = await response.data.results;
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error("ERROR: ", error.message);
    }
  }
};

// INFO: Getting trailer(s) related to the specificGame
export const getTrailer = async (id: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}games/${id}/movies`,
      fetchOneBodyParams
    );
    // const result = await response.data;
    // const result = await response.data.results;
    const result = await response.data.results[0];
    if (result) {
      return result;
    } else {
      return "404. Not found.";
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("ERROR: ", error.message);
    }
  }
};

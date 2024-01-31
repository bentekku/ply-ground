"use server";

import axios from "axios";

const API_KEY = process.env.API_KEY as string;
const BASE_URL = process.env.BASE_URL as string;

type dates = {
  currentDate: string;
  sixMonthsAgo: string;
  formattedDate: string;
};

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

// INFO: For testing
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
      console.error(error.message);
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
      console.error(error.message);
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
      console.error(error.message);
    }
  }
};

// INFO: Implement search
// FYI: could pass the number of results that needed to be return by just passing it as an argument in this function below
export const searchGame = async (searchQuery: string) => {
  const fetchBodyParams = {
    params: {
      key: API_KEY as string,
      search: searchQuery,
      page_size: 2, // returning `n` results
    },
  };
  try {
    const response = await axios.get(`${BASE_URL}games`, fetchBodyParams);
    const result = await response.data.results;
    console.log(result);
    if (result) {
      return result;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
};

export const getTrendingGames = async (mnth: number) => {
  const getNMonthsAgoDate = (month: number): dates => {
    const currentDate = new Date();
    const sixMonthsAgo = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - month,
      currentDate.getDate()
    );
    const formattedDate = sixMonthsAgo.toISOString().split("T")[0];
    // For testing
    // console.log(
    //   `CurrentDate is: ${currentDate}. 6 months ago: ${sixMonthsAgo}. Formatted date: ${formattedDate}. SixMonthsAgo ISOString: ${sixMonthsAgo.toISOString()}`
    // );

    const dates: dates = {
      currentDate: currentDate.toISOString().split("T")[0],
      sixMonthsAgo: sixMonthsAgo.toISOString().split("T")[0],
      formattedDate: formattedDate,
    } as const;

    return dates;
  };

  const { currentDate, sixMonthsAgo } = getNMonthsAgoDate(mnth);
  // For testing
  console.log(`CurrentDate is: ${currentDate}. 6 months ago: ${sixMonthsAgo}`);

  const fetchParams = {
    params: {
      key: API_KEY as string,
      // INFO: the limit for results is 40 by the api itself
      // count: 111, // not sure what this is for, found it on the docs
      page_size: 111,
      // limiting results to biannually
      // "2023-06-01,2024-12-31"
      dates: `${sixMonthsAgo},${currentDate}`,
      // dates: "2023-07-31,2024-01-31",
      ordering: "-added",
    },
  };

  try {
    const response = await axios.get(`${BASE_URL}games`, fetchParams);
    const results = await response.data.results;
    if (results) {
      return results;
    } else {
      console.error("Something went wrong");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export const getTopRatedGames = async (mnth: number) => {
  const getNMonthsAgoDate = (month: number): dates => {
    const currentDate = new Date();
    const sixMonthsAgo = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - month,
      currentDate.getDate()
    );
    const formattedDate = sixMonthsAgo.toISOString().split("T")[0];
    // For testing
    // console.log(
    //   `CurrentDate is: ${currentDate}. 6 months ago: ${sixMonthsAgo}. Formatted date: ${formattedDate}. SixMonthsAgo ISOString: ${sixMonthsAgo.toISOString()}`
    // );

    const dates: dates = {
      currentDate: currentDate.toISOString().split("T")[0],
      sixMonthsAgo: sixMonthsAgo.toISOString().split("T")[0],
      formattedDate: formattedDate,
    } as const;

    return dates;
  };

  const { currentDate, sixMonthsAgo } = getNMonthsAgoDate(mnth);
  // For testing
  console.log(`CurrentDate is: ${currentDate}. 6 months ago: ${sixMonthsAgo}`);

  const fetchParams = {
    params: {
      key: API_KEY as string,
      // INFO: the limit for results is 40 by the api itself
      // count: 111, // not sure what this is for, found it on the docs
      page_size: 111,
      // limiting results to biannually
      // "2023-06-01,2024-12-31"
      dates: `${sixMonthsAgo},${currentDate}`,
      // dates: "2023-07-31,2024-01-31",
      ordering: "-rating",
    },
  };

  try {
    const response = await axios.get(`${BASE_URL}games`, fetchParams);
    const results = await response.data.results;
    if (results) {
      return results;
    } else {
      console.error("Something went wrong");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

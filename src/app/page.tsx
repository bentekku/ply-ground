"use client";

import React, { useEffect, useState } from "react";
import { print, getAllGames } from "../api/connection.api";
import useSearch from "@/contexts/searchContext";
import { arrayShuffler } from "@/utils/arrayShuffler";
import Card from "@/components/card";
import { game } from "./types/game.types";

const Page = () => {
  const [games, setGames] = useState<game[]>([]);

  const searchContext = useSearch();

  const populateWithGames = async () => {
    const results = await getAllGames();
    console.log("results: ", results, "\nresults length: ", results.length);
    return arrayShuffler(results);
  };

  // NOTE: the following code is used to get specific game from the API
  // const getGames = async () => {
  //   if (searchContext) {
  //     const { searchResults, setSearchResults } = searchContext;
  //     const results = await getAllGames();
  //     if (results) setSearchResults(results);
  //     console.log("searchResults: ", searchResults);
  //   }
  // };

  useEffect(() => {
    try {
      // INFO: for testing
      // print();

      const getResults = async () => {
        const results = await populateWithGames();
        setGames(results);
      };
      getResults();
      // scrolling to top of the page on reload
      window.scrollTo(0, 0);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }, []);

  {
    if (games.length !== 0) {
      games.map((game) => {
        return <Card key={game.slug} {...game} />;
      });
    }
  }
};

export default Page;

"use client";

import React, { useEffect, useState } from "react";
import { print, getAllGames } from "../api/connection.api";
import useSearch from "@/contexts/searchContext";
import { arrayShuffler } from "@/utils/arrayShuffler";
import Card from "@/components/card";
import { game } from "../types/game.types";

const Page = () => {
  const [games, setGames] = useState<game[]>([]);

  const searchContext = useSearch();

  const populateWithGames = async () => {
    const results = await getAllGames();

    // INFO: For testing
    console.log(
      Date.now(),
      " .Results: ",
      results,
      "\nresults length: ",
      results.length
    );

    return arrayShuffler(results);
  };

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

  return (
    <main className="px-[2rem] pt-[2rem] pb-[6rem] md:pb-[8rem]  flex flex-wrap gap-[4rem] md:gap-[3rem] justify-center">
      {games.length !== 0
        ? games.map((game) => {
            return <Card key={game.slug} {...game} />;
          })
        : null}
    </main>
  );
};

export default Page;

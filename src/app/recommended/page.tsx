"use client";

import React, { useEffect, useState } from "react";
import { print, getTopRatedGames } from "@/api/connection.api";
import Card from "@/components/card";
import { game } from "@/types/game.types";
import { toast } from "react-hot-toast";
const Page = () => {
  const [games, setGames] = useState<game[]>([]);

  const populateWithGames = async () => {
    const results = await getTopRatedGames(2);

    // INFO: For testing
    console.log(
      Date.now(),
      " .Results: ",
      results,
      "\nresults length: ",
      results.length
    );

    // INFO: There's no need to shuffle the array to randomize the placement of objects, as this is a trending page
    return results;
  };

  useEffect(() => {
    try {
      // For testing
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
        toast.error(error.message);
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

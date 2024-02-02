"use client";

import React, { useEffect, useState, Suspense } from "react";
import { print, getAllGames } from "@/api/connection.api";
import { arrayShuffler } from "@/utils/arrayShuffler";
import Card from "@/components/card";
import { game } from "@/types/game.types";
import { toast } from "react-hot-toast";

const Page = () => {
  const [games, setGames] = useState<game[]>([]);

  const populateWithGames = async () => {
    try {
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
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    try {
      // INFO: for testing
      // print();

      const getResults = async () => {
        try {
          const results = await populateWithGames();
          if (results) {
            setGames(results);
          } else {
            toast("Something went wrong");
          }
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        }
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
      <Suspense
        fallback={
          <h1 className="text-2xl font-bold text-white/85">Loading...</h1>
        }
      >
        {games.length !== 0
          ? games.map((game) => {
              return <Card key={game.slug} {...game} />;
            })
          : null}
      </Suspense>
    </main>
  );
};

export default Page;

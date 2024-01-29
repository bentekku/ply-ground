"use client";

import React, { useEffect, useState } from "react";
import { game } from "@/types/game.types";
import useSearch from "@/contexts/searchContext";
import { getSpecificGame, getTrailer } from "@/api/connection.api";
import HeroImage from "@/components/hero-image";
import GameContent from "@/components/game-content";

const SingleGamePage = () => {
  const searchContext = useSearch();

  // INFO: ! means it's not null, precisely it means, the searchContext won't be null
  const { gameID, setGameID } = searchContext!;
  // not sure how it's working, but it is working
  const [specificGame, setSpecificGame] = useState<game>({} as game);
  const [trailer, setTrailer] = useState<string>("");
  const [isTrailerPresent, setIsTrailerPresent] = useState<boolean>(false);

  // INFO: Getting data related to a game which has been clicked upon
  const getGame = async (arg_id: number) => {
    const result = await getSpecificGame(arg_id);
    // return result;
    setSpecificGame(result);
  };
  // INFO: Getting trailer(s) related to the specificGame
  const getGameTrailer = async (arg_id: number) => {
    const result = await getTrailer(arg_id);
    console.log(Date.now(), " .Result: ", result);
    if (result !== "404. Not found.") {
      setIsTrailerPresent(true);
      if (result.data.max !== undefined) {
        const trailer = result.data.max;
        setTrailer(trailer);
        console.log("Trailer max: ", trailer);
      } else {
        const trailer = result.data["480"];
        setTrailer(trailer);
        console.log("Trailer `480`: ", trailer);
      }
    } else {
      setIsTrailerPresent(false);
    }
    return result.preview;
  };

  useEffect(() => {
    getGame(gameID);
    getGameTrailer(gameID);
  }, []);

  console.log(specificGame);
  return (
    <main className="w-full h-full flex flex-col transition-all">
      {/* IMAGE HERO */}
      <HeroImage
        specificGame={specificGame}
        isTrailerPresent={isTrailerPresent}
        trailer={trailer}
      />{" "}
      {/* Content */}
      <GameContent specificGame={specificGame} />
    </main>
  );
};

export default SingleGamePage;

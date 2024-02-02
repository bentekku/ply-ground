"use client";

import React, { useEffect, useState } from "react";
import { game } from "@/types/game.types";
import { getSpecificGame, getTrailer } from "@/api/connection.api";
import HeroImage from "@/components/hero-image";
import GameContent from "@/components/game-content";
import useSearchContext from "@/contexts/searchContext";

const SingleGamePage = () => {
  // NOTE: Implemented localStorage to store `gameID` for it to be used again in case the user reloads to singleGamePage
  const searchContext = useSearchContext();
  const storedGameID = parseInt(localStorage.getItem("gameID") || "0");
  const gameID = storedGameID || searchContext.gameID;

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
      />
      {/* Content */}
      <GameContent specificGame={specificGame} />
    </main>
  );
};

export default SingleGamePage;

"use client";

import React, { useEffect, useState } from "react";
import { game } from "@/types/game.types";
import useSearch from "@/contexts/searchContext";
import { getSpecificGame, getTrailer } from "@/api/connection.api";
import Image from "next/image";
import readableDate from "@/utils/readableDate";
import { BiCalendar, BiSolidStar } from "react-icons/bi";
import { descSplitter } from "@/utils/splitter";
import { trailer, trailerResult } from "@/types/trailer.types";
import videoPreview from "@/public/videoPreview.png";
import path from "path";

const videoImage = path.join(process.cwd(), "public/videoPreview.png");

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

  const humanReadableDate = readableDate(specificGame.released);
  const newDescr = descSplitter(specificGame.description_raw);

  useEffect(() => {
    getGame(gameID);
    getGameTrailer(gameID);
  }, []);

  console.log(specificGame);
  return (
    // <main className="relative w-full h-full">
    //   <div className="absolute w-full h-[16rem] md:h-[28rem] lg:h-[30rem] z-[-1]">
    //     <Image
    //       src={specificGame.background_image}
    //       alt="game image"
    //       fill
    //       className="object-cover blur-sm"
    //       // width={500}
    //       // height={500}
    //     />
    //   </div>
    //   <div className="w-full px-4 py-6 md:px-10 md:py-12 bg-black/30">
    //     <p className="text-2xl font-semibold md:text-3xl mb-4">
    //       {specificGame.name}
    //     </p>
    //     <p className="text-sm text-white/70 px-4 leading-6 mb-4 overflow-ellipsis">
    //       {/* {specificGame.description_raw.toString().split("....", 200)} */}
    //       {newDescr}
    //     </p>
    //     <div className="text-sm text-white/40 px-4 leading-6 flex items-center justify-around gap-6">
    //       <p className="inline-flex items-center gap-2">
    //         <BiCalendar /> {humanReadableDate}
    //       </p>
    //       <p className="inline-flex items-center gap-2">
    //         <BiSolidStar />
    //         {specificGame.rating}
    //       </p>
    //     </div>
    //   </div>
    // </main>

    <main className="w-full h-full !h-[3000px] transition-all">
      <div className="relative w-full h-[24rem] md:h-[30rem] flex items-center justify-center">
        {/* INFO: Conditionally rendering Trailer player */}
        {isTrailerPresent ? (
          <>
            <Image
              className="object-cover shadow-inner-lg shadow-black/50 blur-[.375rem]"
              src={specificGame.background_image}
              alt={`${specificGame.name}'s image`}
              fill
            />
            <div className="px-4 py-6 w-[28rem] sm:w-[36rem] md:w-[44rem] lg:w-[48rem] aspect-video bg-white/50 rounded-2xl z-[2] shadow-black/10 shadow-md">
              <video
                className=""
                poster="../../../public/videoPreview.png"
                src={trailer}
                controls
                preload="none"
                // muted
                // autoPlay
              >
                <source src={trailer} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </>
        ) : (
          <Image
            className="object-cover shadow-inner-lg shadow-black/50 blur-[.02rem]"
            src={specificGame.background_image}
            alt={`${specificGame.name}'s image`}
            fill
          />
        )}
      </div>

      {specificGame.name}
    </main>
  );
};

export default SingleGamePage;

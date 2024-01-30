import React from "react";
import { BiCalendar, BiSolidStar } from "react-icons/bi";
import ReviewsCard from "./reviews-card";
import GameInfoCard from "./game-info-card";
import { game } from "@/types/game.types";
import readableDate from "@/utils/readableDate";
import descSplitter from "@/utils/desc-splitter";

type GameContentProps = {
  specificGame: game;
};

const GameContent = ({ specificGame }: GameContentProps) => {
  const humanReadableDate = readableDate(specificGame.released);
  const newDescr = descSplitter(specificGame.description_raw);
  return (
    <>
      <section className="w-full px-4 py-6 md:px-10 md:py-12 lg:px-13 lg:py-15">
        <h1 className="text-4xl font-bold underline underline-offset-8 mb-8 mx-auto">
          {specificGame.name}
        </h1>
        <p className="text-[1rem] md:text-[1.2rem] md:leading-[2rem] text-white/75 px-4 leading-7 mb-4 mx-auto w-full lg:w-4/5">
          {newDescr}
        </p>

        {/* Release date and Rating */}
        <div className="mb-12 mx-auto w-full lg:w-4/5">
          <p className="text-[.9rem] md:text-[1rem] md:leading-[1.85rem] text-white/55 px-4 leading-6 mb-4 inline-flex gap-10 flex-wrap">
            <span className="inline-flex items-center gap-2">
              <BiCalendar /> {humanReadableDate}
            </span>
            <span className="inline-flex items-center gap-2">
              <BiSolidStar /> {specificGame.rating} / 5 (
              {specificGame.ratings_count})
            </span>
          </p>
        </div>

        {/* Reviews */}
        <ReviewsCard specificGame={specificGame} />

        {/* Game Info, such as, Publishers, Genres etc */}
        <GameInfoCard specificGame={specificGame} />
      </section>
    </>
  );
};

export default GameContent;

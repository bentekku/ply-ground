"use client";

import useSearch from "@/contexts/searchContext";
import { game } from "@/types/game.types";
import capitalizer from "@/utils/capitalizer";
import readableDate from "@/utils/readableDate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BsFillStarFill } from "react-icons/bs";

type GameSearchCardProps = {
  game: game;
};

const GameSearchCard = ({ game }: GameSearchCardProps) => {
  const searchContext = useSearch();
  const { setGameID, setSearchTerm } = searchContext!;
  const router = useRouter();

  const humanReadableDate = (released: string) => readableDate(released);

  const openGamePage = (slug: string, id: number) => {
    console.log(slug, id);
    setGameID(id);
    router.push(`/${slug}`);
  };

  return (
    <div
      onClick={() => {
        openGamePage(game.slug, game.id);
        setSearchTerm("");
      }}
      key={game.id}
      //  border border-white/90
      className="mx-auto w-full md:w-3/4 lg:w-1/2 px-2 py-2 flex items-center justify-center gap-2 md:gap-12 lg:gap-[5rem] bg-white/5 shadow-md shadow-black/10 rounded-xl hover:scale-105 hover:cursor-pointer transition"
    >
      {/* left - image */}
      {/* border border-red-500/75 */}
      <div className="relative w-[14rem] max-w-[18rem] min-h-[5rem] h-[8rem] max-h-full ">
        <Image
          className="rounded-lg object-cover"
          src={game.background_image}
          alt={capitalizer(game.name)}
          fill
        />
      </div>
      {/* right - content */}
      {/*  border border-yellow-500/75 */}
      <div className="flex flex-col items-start px-3">
        <h1 className="text-[1rem] sm:text-[1.15rem] font-medium mb-2">
          {capitalizer(game.name)}
          {/* {game.name} */}
        </h1>
        <p className="text-[.65rem] sm:text-sm text-white/30 inline-flex items-center text-center justify-center">
          <span className="border border-white/10 py-[.2rem] px-[.4rem] rounded-full">
            {humanReadableDate(game.released)}
          </span>

          <span className="ml-6 text-center inline-flex items-center gap-3 border border-white/10 py-[.2rem] px-[.4rem] rounded-full">
            <BsFillStarFill className="text-[1.1rem] sm:text-[.785rem]" />
            {game.rating} / 5
          </span>
        </p>
      </div>
    </div>
  );
};

export default GameSearchCard;

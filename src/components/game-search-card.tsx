"use client";

import useSearch from "@/contexts/searchContext";
import { game } from "@/types/game.types";
import capitalizer from "@/utils/capitalizer";
import readableDate from "@/utils/readableDate";
import Image from "next/image";
import React from "react";
import { BsFillStarFill } from "react-icons/bs";

type GameSearchCardProps = {
  searchResults: game[];
};

const GameSearchCard = ({ searchResults }: GameSearchCardProps) => {
  const humanReadableDate = readableDate(searchResults[0]?.released);

  return (
    <section className="absolute top-20 z-[9999] w-full bg-gray-950/[97%] shadow-md shadow-white/10 rounded-full px-8 py-5 md:px-2 md:py-3 h-[8rem] transition-all">
      {/* Search result card */}
      <div className="mt-[-1rem] mx-auto w-3/4  px-3 py-3 flex items-center justify-around bg-white/5 shadow-md shadow-black/10 rounded-xl hover:scale-105 hover:cursor-pointer transition">
        {/* left - image */}
        <div className="relative w-[16rem] h-[5rem]">
          <Image
            className="rounded-lg object-cover"
            src={searchResults[0]?.background_image}
            alt={searchResults[0]?.name}
            fill
          />
        </div>
        {/* right - content */}
        <div>
          <h1 className="text-[1.15rem] font-medium mb-2">
            {capitalizer(searchResults[0]?.name)}
          </h1>
          <p className="text-sm text-white/30 inline-flex items-center">
            <span className="border border-white/10 py-[.2rem] px-[.4rem] rounded-full">
              {humanReadableDate}
            </span>

            <span className="ml-6 inline-flex items-center gap-3 border border-white/10 py-[.2rem] px-[.4rem] rounded-full">
              <BsFillStarFill />
              {searchResults[0]?.rating} / 5
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default GameSearchCard;

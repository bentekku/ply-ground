import { game } from "@/types/game.types";
import capitalizer from "@/utils/capitalizer";
import Image from "next/image";
import React from "react";

type GameInfoCardProps = {
  specificGame: game;
};

const GameInfoCard = ({ specificGame }: GameInfoCardProps) => {
  return (
    <>
      <section className="w-3/4  md:w-4/5 lg:w-[46rem] h-full lg:h-[36rem] mx-auto flex flex-wrap lg:flex-nowrap items-start justify-around mb-16 ">
        {/* Image */}
        <div className="relative hidden w-[12rem] md:w-[18rem] lg:w-[24rem]  lg:block lg:h-[36rem] rounded-lg overflow-hidden">
          <Image
            className="object-cover"
            fill
            src={specificGame.background_image}
            alt={`${specificGame.name}'s image`}
          />
        </div>

        {/* GAME DETAILS */}
        <div className="flex-1 h-full flex flex-col items-start justify-evenly px-6 py-6 gap-4 bg-white/5 rounded-lg shadow-md shadow-black/10">
          {/* Publishers */}
          <p className="flex items-center justify-start flex-wrap gap-3 text-white/70 text-[1.05rem]">
            Publishers:{" "}
            {specificGame.publishers
              ?.map((item) => {
                return (
                  <span
                    key={item.id}
                    className="text-white/35 border border-white/15 px-3 py-1 rounded-full text-[.8rem]"
                  >
                    {capitalizer(item.name)}
                  </span>
                );
              })
              .splice(0, 9)}
          </p>
          {/* /Publishers */}

          {/* Platforms */}
          <p className="flex items-center justify-start flex-wrap gap-3 text-white/70 text-[1.05rem]">
            Platform:{" "}
            {specificGame.parent_platforms?.map((item) => {
              return (
                <span
                  key={item.platform.id}
                  className="text-white/35 border border-white/15 px-3 py-1 rounded-full text-[.8rem]"
                >
                  {capitalizer(item.platform.name)}
                </span>
              );
            })}
          </p>
          {/* /Platforms */}

          {/* Genres */}
          <p className="flex items-center justify-start flex-wrap gap-3 text-white/70 text-[1.05rem]">
            Genres:{" "}
            {specificGame.genres?.map((item) => {
              return (
                <span
                  key={item.id}
                  className="text-white/35 border border-white/15 px-3 py-1 rounded-full text-[.8rem]"
                >
                  {capitalizer(item.name)}
                </span>
              );
            })}
          </p>
          {/* /Genres */}

          {/* Stores */}
          <p className="flex items-center justify-start flex-wrap gap-3 text-white/70 text-[1.05rem]">
            Stores:{" "}
            {specificGame.stores?.map((item) => {
              return (
                <span
                  key={item.store.id}
                  className="text-white/35 border border-white/15 px-3 py-1 rounded-full text-[.8rem]"
                >
                  {capitalizer(item.store.name)}
                </span>
              );
            })}
          </p>
          {/* /Stores */}

          {/* Tags */}
          <p className="flex items-center justify-start flex-wrap gap-3 text-white/70 text-[1.05rem]">
            Tags:{" "}
            {specificGame.tags
              ?.map((item) => {
                return (
                  <span
                    key={item.id}
                    className="text-white/35 border border-white/15 px-3 py-1 rounded-full text-[.8rem]"
                  >
                    {capitalizer(item.name)}
                  </span>
                );
              })
              .splice(0, 9)}
          </p>
          {/* /Tags */}
        </div>
      </section>
    </>
  );
};

export default GameInfoCard;

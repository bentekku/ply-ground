import { game } from "@/app/types/game.types";
import Image from "next/image";
import React from "react";

type CardProps = game;

const Card = ({
  name,
  released,
  background_image,
  rating,
  ratings_count,
}: CardProps) => {
  return (
    <div className="group transition-all relative border border-white/10 flex flex-col w-[18rem] h-[20rem] md:w-[24rem] md:h-[21rem] lg:w-[28rem] lg:h-[25rem] rounded-xl overflow-clip">
      <Image
        src={background_image}
        alt={name}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute flex justify-between items-center bg-black/60 w-full px-4 py-6 bottom-0">
        {/* left */}
        <div className="left">
          <p className="font-bold text-white/90 text-lg justify-self-start">
            {name}
          </p>
        </div>

        {/* right */}
        <div className="right">
          <p className="text-sm font-normal text-white/60 justify-self-end">
            Rating: {rating}
            <span>/</span>5
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;

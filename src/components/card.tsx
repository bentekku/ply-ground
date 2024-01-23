import { game } from "@/app/types/game.types";
import Image from "next/image";
import React from "react";

type CardProps = game;

const Card = ({
  slug,
  name,
  released,
  background_image,
  rating,
  ratings_count,
}: CardProps) => {
  return (
    <div className="border border-white/10 flex flex-col w-[18rem] max-h-[20rem] md:w-[24rem] md:h-[21rem] lg:w-[28rem] lg:h-[25rem] rounded-xl overflow-clip">
      <div className="flex-1 object-contain">
        <Image
          src={background_image}
          className=""
          alt={name}
          width={288}
          height={244}
          priority
        />
      </div>
      <div className="flex-1">
        <p>{name}</p>
        <p>{rating}</p>
      </div>
    </div>
  );
};

export default Card;

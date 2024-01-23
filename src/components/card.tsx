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
    <div className="border border-white/30 flex flex-col">
      <div className="flex-1 object-contain">
        <Image src={background_image} alt={name} />
      </div>
      <div className="flex-1">
        <p>{name}</p>
        <p>{rating}</p>
      </div>
    </div>
  );
};

export default Card;

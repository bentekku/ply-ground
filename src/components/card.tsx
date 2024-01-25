import { game } from "@/app/types/game.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BiPlus, BiSolidStar } from "react-icons/bi";

type CardProps = game;

const Card = ({
  name,
  released,
  background_image,
  rating,
  ratings_count,
  slug,
}: CardProps) => {
  // INFO: Router is used to redirect
  const router = useRouter();

  // NOTE: Converting `release` to a human readable format
  const releasedDate = new Date(released);
  const humanReadableDate = releasedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  // console.log(humanReadableDate);

  const openGamePage = (arg_slug: string) => {
    router.push(`/${arg_slug}`);
  };

  const toggleAddToUserCollection = () => {};

  return (
    <div
      onClick={() => openGamePage(slug)}
      className="group transition-all relative border border-white/10 flex flex-col w-[18rem] h-[20rem] md:w-[24rem] md:h-[18rem] lg:w-[28rem] lg:h-[20rem] rounded-xl overflow-clip cursor-pointer"
    >
      {/* Add to user-collection with status of the game */}
      <Image
        src={background_image}
        alt={name}
        fill
        className="object-cover"
        // priority
        loading="eager"
      />

      {/* Add to user-collection */}
      <div className="absolute md:group-hover:block md:hidden right-4 top-4 p-4 bg-white text-black flex items-center justify-center text-center font-medium text-xl rounded-full shadow-black/50 shadow-lg border border-white/40 cursor-pointer hover:scale-110 focus:scale-110 outline-none transition">
        +
      </div>

      <div className="absolute flex justify-between items-start bg-black/60 w-full px-4 py-5 bottom-0 ">
        {/* left */}
        <div className="">
          <p className="font-bold text-white/80 text-lg justify-self-start mb-1">
            {name}
          </p>
          <p className="font-normal text-sm text-white/50">
            {humanReadableDate}
          </p>
        </div>

        {/* right */}
        <div>
          <div className="text-sm font-normal text-white/50 justify-self-end">
            <p className="flex items-center justify-end gap-1">
              <BiSolidStar />
              {rating}
              <span>/</span>5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

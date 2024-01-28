import { game } from "@/types/game.types";
import Image from "next/image";
import React from "react";

type HeroImageProps = {
  specificGame: game;
  isTrailerPresent: boolean;
  trailer: string;
};

const HeroImage = ({
  specificGame,
  isTrailerPresent,
  trailer,
}: HeroImageProps) => {
  return (
    <>
      <section className="relative w-full h-[24rem] md:h-[30rem] flex items-center justify-center">
        {/* INFO: Conditionally rendering Trailer player */}
        {isTrailerPresent ? (
          <>
            <Image
              className="object-cover shadow-inner-lg shadow-black/50 blur-[.375rem]"
              src={specificGame.background_image}
              alt={`${specificGame.name}'s image`}
              fill
            />
            <div className="px-4 py-6 w-[28rem] sm:w-[36rem] md:w-[44rem] lg:w-[48rem] aspect-video bg-white/[3.5%] rounded-2xl z-[2] shadow-black/10 shadow-md">
              <video
                className="w-full h-full"
                src={trailer}
                controls
                preload="auto"
              >
                <source
                  className="w-full h-full" // INFO: This isn't working
                  src={trailer}
                  type="video/mp4"
                />
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
      </section>
    </>
  );
};

export default HeroImage;

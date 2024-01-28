import { game } from "@/types/game.types";
import capitalizer from "@/utils/capitalizer";
import React from "react";

type ReviewsCardProps = {
  specificGame: game;
};

const ReviewsCard = ({ specificGame }: ReviewsCardProps) => {
  return (
    <>
      <section className="flex flex-col items-center justify-center py-3 px-5 bg-white/5 rounded-lg w-3/4 md:w-[36rem] mx-auto mb-12 shadow-sm shadow-black/40">
        <h2 className="text-2xl underline font-semibold mb-8">Ratings</h2>
        <div className="flex items-center justify-around">
          <p className="text-sm text-white/70 px-4 leading-6 mb-4 inline-flex justify-center gap-[3rem] flex-wrap">
            {specificGame.ratings !== undefined &&
              specificGame.ratings.map((item) => {
                return (
                  // className="inline-flex items-center gap-2"
                  <span
                    key={item.id}
                    className="flex flex-col items-center font-semibold"
                  >
                    {item.percent}%{" "}
                    <p className="mt-3 text-white/45 font-medium border border-white/30 px-3 py-2 rounded-full">
                      {/* {(itemTitle = capitalizer(item.title))} */}
                      {capitalizer(item.title)}
                      {/* {itemTitle} */}
                    </p>
                  </span>
                );
              })}
          </p>
        </div>
      </section>
    </>
  );
};

export default ReviewsCard;

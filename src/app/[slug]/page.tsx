"use client";

import React, { useEffect, useState } from "react";
import { game } from "@/types/game.types";
import { trailer, trailerResult } from "@/types/trailer.types";
import useSearch from "@/contexts/searchContext";
import { getSpecificGame, getTrailer } from "@/api/connection.api";
import readableDate from "@/utils/readableDate";
import Image from "next/image";
import {
  BiCalendar,
  BiCommentDetail,
  BiMeh,
  BiSkipNext,
  BiSolidStar,
} from "react-icons/bi";
import { MdRecommend } from "react-icons/md";
import { FaSuperpowers } from "react-icons/fa";
import { descSplitter } from "@/utils/splitter";
import capitalizer from "@/utils/capitalizer";
import Link from "next/link";

const SingleGamePage = () => {
  const searchContext = useSearch();

  // INFO: ! means it's not null, precisely it means, the searchContext won't be null
  const { gameID, setGameID } = searchContext!;
  // not sure how it's working, but it is working
  const [specificGame, setSpecificGame] = useState<game>({} as game);
  const [trailer, setTrailer] = useState<string>("");
  const [isTrailerPresent, setIsTrailerPresent] = useState<boolean>(false);

  // INFO: Getting data related to a game which has been clicked upon
  const getGame = async (arg_id: number) => {
    const result = await getSpecificGame(arg_id);
    // return result;
    setSpecificGame(result);
  };

  // INFO: Getting trailer(s) related to the specificGame
  const getGameTrailer = async (arg_id: number) => {
    const result = await getTrailer(arg_id);
    console.log(Date.now(), " .Result: ", result);
    if (result !== "404. Not found.") {
      setIsTrailerPresent(true);
      if (result.data.max !== undefined) {
        const trailer = result.data.max;
        setTrailer(trailer);
        console.log("Trailer max: ", trailer);
      } else {
        const trailer = result.data["480"];
        setTrailer(trailer);
        console.log("Trailer `480`: ", trailer);
      }
    } else {
      setIsTrailerPresent(false);
    }
    return result.preview;
  };

  const humanReadableDate = readableDate(specificGame.released);
  const newDescr = descSplitter(specificGame.description_raw);

  useEffect(() => {
    getGame(gameID);
    getGameTrailer(gameID);
  }, []);

  let itemTitle: string = "";

  console.log(specificGame);
  return (
    // <main className="relative w-full h-full">
    //   <div className="absolute w-full h-[16rem] md:h-[28rem] lg:h-[30rem] z-[-1]">
    //     <Image
    //       src={specificGame.background_image}
    //       alt="game image"
    //       fill
    //       className="object-cover blur-sm"
    //       // width={500}
    //       // height={500}
    //     />
    //   </div>
    //   <div className="w-full px-4 py-6 md:px-10 md:py-12 bg-black/30">
    //     <p className="text-2xl font-semibold md:text-3xl mb-4">
    //       {specificGame.name}
    //     </p>
    //     <p className="text-sm text-white/70 px-4 leading-6 mb-4 overflow-ellipsis">
    //       {/* {specificGame.description_raw.toString().split("....", 200)} */}
    //       {newDescr}
    //     </p>
    //     <div className="text-sm text-white/40 px-4 leading-6 flex items-center justify-around gap-6">
    //       <p className="inline-flex items-center gap-2">
    //         <BiCalendar /> {humanReadableDate}
    //       </p>
    //       <p className="inline-flex items-center gap-2">
    //         <BiSolidStar />
    //         {specificGame.rating}
    //       </p>
    //     </div>
    //   </div>
    // </main>

    <main className="w-full h-full flex flex-col transition-all">
      {/* IMAGE HERO */}
      <div className="relative w-full h-[24rem] md:h-[30rem] flex items-center justify-center">
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
      </div>{" "}
      {/* /IMAGE HERO */}
      {/* Content */}
      <div className="w-full px-4 py-6 md:px-10 md:py-12 lg:px-13 lg:py-15">
        <h1 className="text-4xl font-bold underline underline-offset-8 mb-8">
          {specificGame.name}
        </h1>
        <p className="text-sm text-white/70 px-4 leading-7 mb-4 w-4/5">
          {newDescr}
        </p>

        {/* Details */}
        <div className="mb-12">
          <p className="text-sm text-white/70 px-4 leading-6 mb-4 inline-flex gap-10 flex-wrap">
            <span className="inline-flex items-center gap-2">
              <BiCalendar /> {humanReadableDate}
            </span>
            <span className="inline-flex items-center gap-2">
              <BiSolidStar /> {specificGame.rating} / 5 (
              {specificGame.ratings_count})
            </span>
          </p>
        </div>

        {/* Mapping through reviews */}
        <div className="flex flex-col items-center justify-center py-3 px-5 bg-white/5 rounded-lg w-3/4 md:w-[36rem] mx-auto mb-12 shadow-sm shadow-black/40">
          <h2 className="text-2xl underline font-semibold mb-8">Ratings</h2>
          <section className="flex items-center justify-around">
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
          </section>
        </div>

        {/* More details about the game */}
        <section className="w-3/4  md:w-4/5 lg:w-[46rem] h-full lg:h-[34rem] mx-auto flex flex-wrap lg:flex-nowrap items-start justify-around mb-16 ">
          {/* image */}
          {/* h-[21rem] */}
          <div className="relative hidden w-[12rem] md:w-[18rem] lg:w-[24rem]  lg:block lg:h-[34rem] rounded-lg overflow-hidden   border border-yellow-500/20">
            <Image
              className="object-cover"
              fill
              src={specificGame.background_image}
              alt={`${specificGame.name}'s image`}
            />
          </div>
          {/* DETAILS */}
          <div className="flex-1 h-full flex flex-col items-start justify-evenly px-6 py-6 gap-4  border border-red-500/20">
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
      </div>
      {/* /Content */}
    </main>
  );
};

export default SingleGamePage;

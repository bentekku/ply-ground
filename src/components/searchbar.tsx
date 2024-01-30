"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { CgUser } from "react-icons/cg";
import useSearch from "@/contexts/searchContext";
import { searchGame } from "@/api/connection.api";
import { setTimeout } from "timers";
import Image from "next/image";
import { BsFillStarFill } from "react-icons/bs";
import readableDate from "@/utils/readableDate";
import capitalizer from "@/utils/capitalizer";
import GameSearchCard from "./game-search-card"; // no need for it now, decided to go this single component
import { useRouter } from "next/navigation";

type Props = {};

const SearchBar = (props: Props) => {
  const router = useRouter();
  const searchContext = useSearch();
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    setSearchResults,
    setGameID,
  } = searchContext!;
  const humanReadableDate = readableDate(searchResults[0]?.released);

  const searchThatGame = async (query: string) => {
    try {
      const result = await searchGame(query);
      if (result) {
        setSearchResults(result);
        console.log("Game found: ", result);
      } else {
        throw new Error("Game not found");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error: ", error.message);
      }
    }
  };

  const openGamePage = (slug: string, id: number) => {
    console.log(slug, id);
    setGameID(id);
    router.push(`/${slug}`);
  };

  useEffect(() => {
    console.log("Query: ", searchTerm);

    //INFO: Creating a timer
    let timer: NodeJS.Timeout;
    if (searchTerm) {
      timer = setTimeout(() => {
        searchThatGame(searchTerm);
      }, 1000);
    }
    // INFO: Incase the user changes the value of the input field before the timer ends, it will clear the timer
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <header className="relative w-full py-4 flex items-center justify-center mb-12 transition-all">
      {/* Search bar */}
      <nav className="w-full px-8 py-5 md:px-2 md:py-3 fixed top-0 flex items-center md:justify-center z-[9999] bg-gray-950/[96%] shadow-black/40 shadow-xl">
        <input
          className="w-4/5 md:w-[24rem] h-[2.25rem] rounded-lg text-white/85 px-3 bg-white/10 border border-white/10 no-outlines active:scale-105 focus:scale-105 shadow-md transition-all"
          type="search"
          name="search-box"
          id=""
          onChange={(e) => {
            // setting searchTerm
            setSearchTerm(e.target.value);
            // preventing default behaviour, honestly there's no need for this as its not getting submitted instead the searchThatGame is being called indepentently of the submit button
            e.preventDefault();
          }}
          value={searchTerm}
        />
        <Link
          className="group absolute top-[1.2rem] right-5 md:right-[3rem] md:top-[.5rem]  border border-white/20 p-2 rounded-full bg-gray-950 shadow-md "
          href="#"
        >
          <CgUser className="text-2xl text-white/30 group-hover:text-white transition" />
        </Link>
      </nav>

      {/* Search result dropdown */}
      {searchTerm && (
        <section className="fixed top-[3.7rem] z-[9999] w-full h-fit bg-gray-950/[97%] shadow-md shadow-white/10 rounded-3xl px-8 pt-4 pb-10 md:px-2 md:pt-4 md:pb-10 transition-all flex flex-col gap-4 overflow-y-scroll">
          {/* Mapping throught the searchResults and displaying them */}
          {searchResults.map((game) => (
            <div
              onClick={() => {
                openGamePage(game.slug, game.id);
                setSearchTerm("");
              }}
              key={game.id}
              className="mx-auto w-full md:w-3/4 lg:w-1/2 px-2 py-2 flex items-center justify-center gap-2 md:gap-12 bg-white/5 shadow-md shadow-black/10 rounded-xl hover:scale-105 hover:cursor-pointer transition border border-white/90"
            >
              {/* left - image */}
              <div className="relative w-[14rem] max-w-[18rem] min-h-[5rem] h-[8rem] max-h-full border border-red-500/75">
                <Image
                  className="rounded-lg object-cover"
                  src={game.background_image}
                  alt={game.name}
                  fill
                />
              </div>
              {/* right - content */}
              <div className="flex flex-col items-start px-3 border border-yellow-500/75">
                <h1 className="text-[1rem] sm:text-[1.15rem] font-medium mb-2">
                  {/* {capitalizer(searchResults[0]?.name)} */}
                  {game.name}
                </h1>
                <p className="text-[.65rem] sm:text-sm text-white/30 inline-flex items-center text-center justify-center">
                  <span className="border border-white/10 py-[.2rem] px-[.4rem] rounded-full">
                    {humanReadableDate}
                  </span>

                  <span className="ml-6 text-center inline-flex items-center gap-3 border border-white/10 py-[.2rem] px-[.4rem] rounded-full">
                    <BsFillStarFill className="text-[1.1rem] sm:text-[.785rem]" />
                    {searchResults[0]?.rating} / 5
                  </span>
                </p>
              </div>
            </div>
          ))}
        </section>
      )}
    </header>
  );
};

export default SearchBar;

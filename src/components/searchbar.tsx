// TODO: fix null error of the searchContext [in progress]

// INFO: The timer from NodeJS.Timer is not optimal way to limit how frequent the search function is called, in order to tackle that, we can use `debounce` and `lazy loading` components that needed to be done

"use client";

import Link from "next/link";
import React, { useEffect, Suspense } from "react";
import { CgUser } from "react-icons/cg";
import useSearchContext from "@/contexts/searchContext";
import { searchGame } from "@/api/connection.api";
import _ from "lodash";
import GameSearchCard from "./game-search-card";
import { toast } from "react-hot-toast";

const SearchBar = () => {
  const { searchTerm, setSearchTerm, searchResults, setSearchResults } =
    useSearchContext();

  const searchThatGame = async (query: string) => {
    try {
      const result = await searchGame(query);
      if (result) {
        setSearchResults(result);
        console.log("Game found: ", result);
      } else {
        // throw new Error("Game not found");
        toast.error("Game not found");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    console.log("Query: ", searchTerm);

    // INFO: Using debounce
    const debouncedSearch = _.debounce((term: string) => {
      searchThatGame(term);
    }, 800);
    debouncedSearch(searchTerm);
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
          placeholder="Search for games..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
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
        <section className="fixed top-[3.65rem] z-[9999] w-full md:w-3/4  h-fit bg-gray-950/[96%] shadow-md shadow-white/10 rounded-b-3xl px-8 pt-6 pb-10 md:px-16 md:pt-6 md:pb-10 transition-all flex flex-col gap-4">
          {/* Mapping throught the searchResults and displaying them */}
          {searchResults.map((game, indx) => (
            <Suspense key={indx} fallback={<div>Loading...</div>}>
              <GameSearchCard key={game.id} game={game} />
            </Suspense>
          ))}
        </section>
      )}
    </header>
  );
};

export default SearchBar;

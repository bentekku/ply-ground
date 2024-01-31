"use client";

import { game } from "@/types/game.types";
import React, { createContext, useContext, useState } from "react";

type SearchProviderProps = {
  children: React.ReactNode;
};

type SearchContextType = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;

  searchResults: game[];
  setSearchResults: React.Dispatch<React.SetStateAction<game[]>>;

  // INFO: Keeping track of the game card's id that has been clicked upon
  gameID: number;
  setGameID: React.Dispatch<React.SetStateAction<number>>;

  // INFO: grabSpecificGame is used to get specific game(s) from the API
  grabSpecificGame: () => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<game[]>([]);
  const [gameID, setGameID] = useState<number>(0);

  const grabSpecificGame = async () => {};

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,

        searchResults,
        setSearchResults,

        gameID,
        setGameID,

        grabSpecificGame,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === null) {
    throw new Error("useSearch must be used within a SearchProvider");
  } else {
    return useContext(SearchContext);
  }
};

export default useSearch;

"use client";

import { game } from "@/app/types/game.types";
import React, { createContext, useContext, useState } from "react";

type SearchProviderProps = {
  children: React.ReactNode;
};

type SearchContextType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  searchResults: game[];
  setSearchResults: React.Dispatch<React.SetStateAction<game[]>>;

  // INFO: grabSpecificGame is used to get specific game(s) from the API
  grabSpecificGame: () => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<game[]>([]);

  const grabSpecificGame = async () => {};

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,

        searchResults,
        setSearchResults,

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
  }
  return useContext(SearchContext);
};

export default useSearch;

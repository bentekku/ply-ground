"use client";

import Link from "next/link";
import React from "react";
import { CgUser } from "react-icons/cg";

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <header className="relative w-full py-4 flex items-center justify-center mb-12">
      {/* Search bar */}
      <nav className="w-full px-8 py-5 md:px-2 md:py-3 fixed top-0 flex items-center md:justify-center z-[9999]">
        <input
          className="w-4/5 md:w-[24rem] h-[2.25rem] rounded-lg text-white/85 px-3 bg-white/10 border border-white/10 no-outlines active:scale-105 focus:scale-105 shadow-md transition-all"
          type="search"
          name="search-box"
          id=""
        />
        <Link
          className="group absolute top-[1.2rem] right-5 md:right-[3rem] md:top-[.5rem]  border border-white/20 p-2 rounded-full bg-gray-950 shadow-md "
          href="#"
        >
          <CgUser className="text-2xl text-white/30 group-hover:text-white transition" />
        </Link>
      </nav>
    </header>
  );
};

export default SearchBar;

"use client";

import React from "react";
import { links } from "../data/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./searchbar";

type Props = {};

function Navbar({}: Props) {
  const path = usePathname();

  return (
    <header className="relative w-full flex items-center justify-center">
      {/* Search bar */}
      <SearchBar />

      {/* Bottom Nav */}
      <nav className="fixed bottom-5 gap-10 w-[12.5rem] md:w-[24rem] flex items-center justify-center md:gap-[6rem] bg-gray-950 py-4 md:py-6 rounded-full border border-white/10 drop-shadow-md z-[9999]">
        {links.map((link) => {
          if (path === link.url) {
            return (
              <Link className="links active" key={link.name} href={link.url}>
                <link.icon />
              </Link>
            );
          } else {
            return (
              <Link className="links" key={link.name} href={link.url}>
                <link.icon />
              </Link>
            );
          }
        })}
      </nav>
    </header>
  );
}

export default Navbar;

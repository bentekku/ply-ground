"use client";

import React from "react";
import { links } from "../../data/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgUser } from "react-icons/cg";

type Props = {};

function Navbar({}: Props) {
  const path = usePathname();

  return (
    <header className="relative w-full py-4 flex items-center justify-center mb-12">
      {/* Search Bar */}
      <nav className="w-full px-8 py-5 md:px-2 md:py-3 fixed top-0 flex items-center md:justify-center z-[9999]">
        <input
          className="w-4/5 md:w-[24rem] h-[2.25rem] rounded-lg text-white/85 px-3 bg-white/10 border border-white/10 no-outlines active:scale-105 focus:scale-105 shadow-md transition-all"
          type="search"
          name="search-box"
          id=""
        />
        <Link
          className="absolute top-[1.2rem] right-5 md:right-[3rem] md:top-[.5rem] group border border-white/20 p-2 rounded-full bg-gray-950 shadow-md transition-all"
          href="#"
        >
          <CgUser className="text-2xl links group-hover:text-white " />
        </Link>
      </nav>

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

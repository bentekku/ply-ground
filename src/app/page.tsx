"use client";

import React, { useEffect } from "react";
import { print, getAllGames } from "../api/connection.api";
import SearchBar from "@/components/searchbar";

type Props = {};

const games = async () => {
  const results = await getAllGames();
  console.log("results: ", results);
};

function Page({}: Props) {
  useEffect(() => {
    games();
    try {
      print();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }, []);

  return (
    <>
      <div>Home</div>
    </>
  );
}

export default Page;

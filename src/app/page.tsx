"use client";

import React, { useEffect } from "react";
import { print, getAllGames } from "../api/connection.api";

type Props = {};
try {
  print();
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
const games = async () => {
  const results = await getAllGames();
  console.log("results: ", results);
};

function Page({}: Props) {
  useEffect(() => {
    games();
  }, []);

  return <div>Home</div>;
}

export default Page;

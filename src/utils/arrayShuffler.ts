import { game } from "@/types/game.types";

// NOTE: this is used to shuffle an array
export const arrayShuffler = (array: game[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

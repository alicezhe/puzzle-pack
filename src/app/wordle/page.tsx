"use client";

import WordleProvider from "@/contexts/wordle";
import Game from "@/components/wordle/game";

export default function Wordle() {
  return (
    <WordleProvider>
      <Game />
    </WordleProvider>
  );
}

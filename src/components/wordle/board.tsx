import { useContext } from "react";
import { WordleContext } from "@/contexts/wordle";

import styles from "@/styles/wordle.module.css";
import Row from "./row";
import { Guess } from "@/models/wordle";

export default function Board() {
  const {
    state: { guesses },
  } = useContext(WordleContext);

  return (
    <div className={styles.board}>
      {guesses.map((guess: Guess, i) => (
        <Row key={i} guess={guess} />
      ))}
    </div>
  );
}

import { LETTER_STATUS } from "@/constants/wordle";
import { LetterProps } from "@/models/wordle";
import styles from "@/styles/wordle.module.css";

export default function Letter({ letter }: LetterProps) {
  const { value, state } = letter;

  return (
    <div
      className={`${styles.letter} ${styles[`${state}`]} ${state !== LETTER_STATUS.IN_PROGRESS ? styles.flip : ""}`}
    >
      {value}
    </div>
  );
}

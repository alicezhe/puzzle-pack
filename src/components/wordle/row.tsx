import Letter from "./letter";
import styles from "@/styles/wordle.module.css";
import { RowProps } from "@/models/wordle";

export default function Row({ guess }: RowProps) {
  const { letters } = guess;

  return (
    <div className={styles.row}>
      {letters.map((letter, i) => (
        <Letter key={i} letter={letter} />
      ))}
    </div>
  );
}

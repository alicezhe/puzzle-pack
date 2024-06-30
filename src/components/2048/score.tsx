import { Puzzle2048Context } from "@/contexts/2048";
import styles from "@/styles/2048.module.css";
import { useContext } from "react";

export default function Score() {
  const { score } = useContext(Puzzle2048Context);

  return (
    <div className={styles.score}>
      Score
      <div>{score}</div>
    </div>
  );
}

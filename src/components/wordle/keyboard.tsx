import styles from "@/styles/wordle.module.css";
import { KEYBOARD_VALS } from "@/constants/wordle";
import Key from "@/components/wordle/key";

export default function Keyboard() {
  return (
    <div className={styles.keyboard}>
      {KEYBOARD_VALS.map((keyboardRow, i) => {
        return (
          <div
            className={`${styles["keyboard-row"]} ${styles[`keyboard-row-${i}`]}`}
            key={`keyboard-row-${i}`}
          >
            {keyboardRow.map((keyData, j) => {
              return <Key keyData={keyData} key={`key-${j}`} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

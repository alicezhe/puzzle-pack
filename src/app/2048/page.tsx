"use client";

import Puzzle2048Provider from "@/contexts/2048";
import Board from "@/components/2048/board";
import styles from "@/styles/2048.module.css";
import Score from "@/components/2048/score";
import Footer from "@/components/footer";
import BackNavigation from "@/components/backNavigation";

export default function Puzzle2048() {
  return (
    <Puzzle2048Provider>
      <div className={styles.main}>
        <div className={styles.twenty48}>
          <div></div>
          <div>
            <BackNavigation fillColor={"#776e65"} />
            <header>
              <h1>2048</h1>
              <Score />
            </header>
            <Board />
          </div>
          <Footer fillColor={"#776e65"} />
        </div>
      </div>
    </Puzzle2048Provider>
  );
}

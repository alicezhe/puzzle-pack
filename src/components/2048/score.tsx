import { Puzzle2048Context } from "@/contexts/2048";
import styles from "@/styles/2048.module.css";
import { useContext } from "react";
import RestartIcon from "../../../public/images/restart";
import { Tooltip } from "flowbite-react";

export default function Score() {
  const { score, restartGame } = useContext(Puzzle2048Context);

  return (
    <>
      <header>
        <h1 className={styles.flex1}>2048</h1>
        <div className={styles.restart}>
          <Tooltip
            content="Restart"
            placement="top"
            arrow={false}
            className="bg-[#776e65]"
          >
            <button onClick={() => restartGame()} type="button">
              <RestartIcon fillColor={"#776e65"} />
            </button>
          </Tooltip>
        </div>
        <div className={styles.flex1}>
          <div className={styles.score}>
            Score
            <div>{score}</div>
          </div>
        </div>
      </header>
    </>
  );
}

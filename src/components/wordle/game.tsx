import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WordleContext } from "@/contexts/wordle";
import { GAME_ACTION, GAME_STATUS, WORD_LENGTH } from "@/constants/wordle";
import { guesses } from "@/data/wordle_guesses";

import styles from "@/styles/wordle.module.css";
import Board from "./board";
import Footer from "@/components/shared/footer";
import Keyboard from "@/components/wordle/keyboard";
import BackIcon from "../../../public/images/back";
import RestartIcon from "../../../public/images/restart";
import { Toast, Tooltip } from "flowbite-react";

export default function Game() {
  const router = useRouter();
  const { state, dispatch } = useContext(WordleContext);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (
      state.gameStatus === GAME_STATUS.WON ||
      state.gameStatus === GAME_STATUS.LOST ||
      state.errorMessage !== ""
    ) {
      setShowToast(true);
    }

    if (state.gameStatus === GAME_STATUS.WON) {
      setToastMessage("Congrats!");
    } else if (state.gameStatus === GAME_STATUS.LOST) {
      setToastMessage(state.answer);
    } else if (state.errorMessage !== "") {
      setToastMessage(state.errorMessage);
    }

    setTimeout(() => {
      setShowToast(false);

      if (state.errorMessage !== "") {
        dispatch({
          type: GAME_ACTION.SHOW_ERROR,
          payload: {
            message: "",
          },
        });
      }
    }, 2000);
  }, [state.gameStatus, state.errorMessage, dispatch, state.answer]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();

      if (
        state.gameStatus !== GAME_STATUS.WON &&
        state.gameStatus !== GAME_STATUS.LOST
      ) {
        if (e.code === "Enter") {
          if (
            state.guesses[state.currGuess].guessString.length === WORD_LENGTH &&
            guesses.includes(
              state.guesses[state.currGuess].guessString.toLowerCase(),
            )
          ) {
            dispatch({ type: GAME_ACTION.SUBMIT_GUESS, payload: {} });
          } else if (
            state.guesses[state.currGuess].guessString.length === WORD_LENGTH
          ) {
            dispatch({
              type: GAME_ACTION.SHOW_ERROR,
              payload: { message: "Not in word list" },
            });
          } else {
            dispatch({
              type: GAME_ACTION.SHOW_ERROR,
              payload: { message: "Not enough letters" },
            });
          }
        } else if (e.code === "Backspace") {
          dispatch({ type: GAME_ACTION.DELETE_KEY, payload: {} });
        } else if (e.code.startsWith("Key")) {
          dispatch({
            type: GAME_ACTION.ADD_KEY,
            payload: { key: e.code.substring(3) },
          });
        }
      }
    },
    [state, dispatch],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={styles.main}>
      <div className={styles.wordle}>
        <div></div>
        <div className="flex flex-col items-center">
          <div className={styles.header}>
            <button onClick={() => router.push("/")} className={styles.back}>
              <span className={styles.link}>
                <BackIcon fillColor={"#121213"} />
              </span>
            </button>
            <h1>Wordle</h1>
            <Tooltip
              content="Restart"
              placement="bottom"
              arrow={false}
              className={`bg-[#9c9c9c] ${styles.link}`}
            >
              <button
                type="button"
                onClick={() => dispatch({ type: GAME_ACTION.RESTART })}
              >
                <RestartIcon fillColor={"#121213"} />
              </button>
            </Tooltip>
          </div>
          <Board />
          <Keyboard />
          <div className={`${styles.toast} ${showToast ? styles.show : ""}`}>
            <Toast className="text-white bg-[#3a3a3c]">{toastMessage}</Toast>
          </div>
        </div>
        <Footer fillColor={"#121213"} />
      </div>
    </div>
  );
}

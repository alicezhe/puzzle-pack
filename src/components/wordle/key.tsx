import { GAME_ACTION, GAME_STATUS, WORD_LENGTH } from "@/constants/wordle";
import { WordleContext } from "@/contexts/wordle";
import { guesses } from "@/data/wordle_guesses";
import { KeyboardKeyProps } from "@/models/wordle";
import styles from "@/styles/wordle.module.css";
import { useCallback, useContext } from "react";

export default function Key({ keyData }: KeyboardKeyProps) {
  const { state, dispatch } = useContext(WordleContext);
  const { value, size } = keyData;

  const handleClick = useCallback(() => {
    if (
      state.gameStatus !== GAME_STATUS.WON &&
      state.gameStatus !== GAME_STATUS.LOST
    ) {
      if (value === "Enter") {
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
      } else if (value === "Del") {
        dispatch({ type: GAME_ACTION.DELETE_KEY, payload: {} });
      } else {
        dispatch({
          type: GAME_ACTION.ADD_KEY,
          payload: { key: value },
        });
      }
    }
  }, [state, dispatch, value]);

  return (
    <div
      className={`${styles.key} ${styles[`key-state-${state.keyStatuses[`${value}`]}`]} ${styles[`key-size-${size}`]}`}
    >
      <button onClick={() => handleClick()}>{value}</button>
    </div>
  );
}

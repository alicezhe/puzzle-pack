import { answers } from "@/data/wordle_answers";
import {
  GAME_STATUS,
  LETTER_STATUS,
  WORD_LENGTH,
  NUM_GUESSES,
  GAME_ACTION,
  VALID_KEYS,
} from "@/constants/wordle";
import { GameAction, KeyStatuses, Letter, State } from "@/models/wordle";

export const initialState: State = {
  answer: generateAnswer(),
  gameStatus: GAME_STATUS.IN_PROGRESS,
  keyStatuses: setUpKeyStatuses(),
  errorMessage: "",
  guesses: setUpGuesses(),
  currGuess: 0,
}!;

function generateAnswer() {
  const index = Math.floor(Math.random() * answers.length);
  return answers[index].toUpperCase();
}

function setUpGuesses() {
  const rows = [];
  for (let i = 0; i < NUM_GUESSES; i++) {
    rows.push({
      guessIndex: i,
      currIndex: 0,
      letters: setUpLetters(),
      guessString: "",
    });
  }
  return rows;
}

function setUpLetters() {
  const letters = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    letters.push({
      index: i,
      value: "",
      state: LETTER_STATUS.UNUSED,
    });
  }
  return letters;
}

function setUpKeyStatuses() {
  const keyStatuses: KeyStatuses = {};
  for (let i = 0; i < VALID_KEYS.length; i++) {
    keyStatuses[VALID_KEYS[i]] = LETTER_STATUS.UNUSED;
  }
  return keyStatuses;
}

export default function WordleReducer(state: State, action: GameAction) {
  switch (action.type) {
    case GAME_ACTION.ADD_KEY: {
      const newGuesses = JSON.parse(JSON.stringify(state.guesses));
      const currGuess = newGuesses[state.currGuess];
      const currIndex = currGuess.currIndex;

      if (
        currIndex < WORD_LENGTH - 1 ||
        (currIndex === WORD_LENGTH - 1 &&
          currGuess.letters[currIndex].value === "")
      ) {
        currGuess.letters[currIndex].value = action.payload.key;
        currGuess.letters[currIndex].state = LETTER_STATUS.IN_PROGRESS;
      }

      if (currIndex < WORD_LENGTH - 1) {
        currGuess.currIndex += 1;
      }

      currGuess.guessString = newGuesses[state.currGuess].letters
        .map((letter: Letter) => letter.value)
        .join("");

      return { ...state, guesses: newGuesses };
    }
    case GAME_ACTION.DELETE_KEY: {
      const newGuesses = JSON.parse(JSON.stringify(state.guesses));
      const currGuess = newGuesses[state.currGuess];
      const currIndex = currGuess.currIndex;

      if (!currIndex) return { ...state, guesses: newGuesses };

      if (currGuess.letters[WORD_LENGTH - 1].value === "") {
        currGuess.letters[currIndex - 1].value = "";
        currGuess.letters[currIndex - 1].state = LETTER_STATUS.UNUSED;
        currGuess.currIndex -= 1;
      } else {
        currGuess.letters[currIndex].value = "";
        currGuess.letters[currIndex].state = LETTER_STATUS.UNUSED;
      }

      currGuess.guessString = newGuesses[state.currGuess].letters
        .map((letter: Letter) => letter.value)
        .join("");

      return { ...state, guesses: newGuesses };
    }
    case GAME_ACTION.SUBMIT_GUESS: {
      const newGuesses = JSON.parse(JSON.stringify(state.guesses));
      let newGameStatus = state.gameStatus;

      const newKeyStatuses = {} as KeyStatuses;
      for (let key in state.keyStatuses) {
        newKeyStatuses[key] = state.keyStatuses[key];
      }

      const keyFreqs: { [key: string]: number } = {};
      for (let i = 0; i < state.answer.length; i++) {
        keyFreqs[state.answer.charAt(i)] =
          (keyFreqs[state.answer.charAt(i)] || 0) + 1;
      }

      for (let i = 0; i < WORD_LENGTH; i++) {
        const currVal = newGuesses[state.currGuess].letters[i].value;
        if (currVal === state.answer[i]) {
          newKeyStatuses[currVal] = LETTER_STATUS.CORRECT;
        } else if (state.answer.includes(currVal)) {
          newKeyStatuses[currVal] = LETTER_STATUS.MISPLACED;
        } else {
          newKeyStatuses[currVal] = LETTER_STATUS.INCORRECT;
        }
      }

      for (let i = 0; i < WORD_LENGTH; i++) {
        if (
          newGuesses[state.currGuess].letters[i].value ===
          state.answer.charAt(i)
        ) {
          newGuesses[state.currGuess].letters[i].state = LETTER_STATUS.CORRECT;
          keyFreqs[state.answer.charAt(i)]--;
        }
      }

      for (let i = 0; i < WORD_LENGTH; i++) {
        const currVal = newGuesses[state.currGuess].letters[i].value;
        if (
          currVal !== state.answer.charAt(i) &&
          Object.keys(keyFreqs).includes(currVal) &&
          keyFreqs[currVal] > 0
        ) {
          newGuesses[state.currGuess].letters[i].state =
            LETTER_STATUS.MISPLACED;
          keyFreqs[currVal]--;
        } else if (currVal !== state.answer.charAt(i)) {
          newGuesses[state.currGuess].letters[i].state =
            LETTER_STATUS.INCORRECT;
        }
      }

      if (newGuesses[state.currGuess].guessString === state.answer) {
        newGameStatus = GAME_STATUS.WON;
      } else if (state.currGuess === NUM_GUESSES - 1) {
        newGameStatus = GAME_STATUS.LOST;
      }

      return {
        ...state,
        keyStatuses: newKeyStatuses,
        guesses: newGuesses,
        gameStatus: newGameStatus,
        currGuess: state.currGuess + 1,
      };
    }
    case GAME_ACTION.SHOW_ERROR: {
      return { ...state, errorMessage: action.payload.message };
    }
    case GAME_ACTION.RESTART: {
      return {
        answer: generateAnswer(),
        gameStatus: GAME_STATUS.IN_PROGRESS,
        keyStatuses: setUpKeyStatuses(),
        errorMessage: "",
        guesses: setUpGuesses(),
        currGuess: 0,
      };
    }
    default:
      return { ...state };
  }
}

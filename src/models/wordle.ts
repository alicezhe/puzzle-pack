import { GAME_STATUS, LETTER_STATUS } from "@/constants/wordle";

export interface State {
  answer: string;
  gameStatus: GameStatus;
  keyStatuses: KeyStatuses;
  errorMessage: string;
  guesses: Guess[];
  currGuess: number;
}

export interface Guess {
  letters: Letter[];
  currIndex: number;
  guessIndex: number;
  guessString: string;
}

export type GameStatus =
  | GAME_STATUS.IN_PROGRESS
  | GAME_STATUS.WON
  | GAME_STATUS.LOST;

export interface KeyStatuses {
  [key: string]: LetterStatus;
}

export interface GameAction {
  type: string;
  payload: any;
}

export type LetterStatus =
  | LETTER_STATUS.UNUSED
  | LETTER_STATUS.IN_PROGRESS
  | LETTER_STATUS.CORRECT
  | LETTER_STATUS.MISPLACED
  | LETTER_STATUS.INCORRECT;

export interface KeyboardKey {
  value: string;
  size: "sm" | "lg";
}

export interface KeyboardKeyProps {
  keyData: KeyboardKey;
}

export interface Letter {
  value: string;
  state: LetterStatus;
}

export interface LetterProps {
  letter: Letter;
}

export type KeyboardRow = KeyboardKey[];

export interface RowProps {
  guess: Guess;
}

export const WORD_LENGTH = 5;
export const NUM_GUESSES = 6;

export enum GAME_STATUS {
  IN_PROGRESS = "IN_PROGRESS",
  WON = "WON",
  LOST = "LOST",
}

export enum LETTER_STATUS {
  UNUSED = "UNUSED",
  IN_PROGRESS = "IN_PROGRESS",
  CORRECT = "CORRECT",
  MISPLACED = "MISPLACED",
  INCORRECT = "INCORRECT",
}

export enum GAME_ACTION {
  ADD_KEY = "ADD_KEY",
  DELETE_KEY = "DELETE_KEY",
  SUBMIT_GUESS = "SUBMIT_GUESS",
  SHOW_ERROR = "SHOW_ERROR",
  RESTART = "RESTART",
}

export const VALID_KEYS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export const KEYBOARD_VALS = [
  [
    { size: "sm", value: "Q" },
    { size: "sm", value: "W" },
    { size: "sm", value: "E" },
    { size: "sm", value: "R" },
    { size: "sm", value: "T" },
    { size: "sm", value: "Y" },
    { size: "sm", value: "U" },
    { size: "sm", value: "I" },
    { size: "sm", value: "O" },
    { size: "sm", value: "P" },
  ],
  [
    { size: "sm", value: "A" },
    { size: "sm", value: "S" },
    { size: "sm", value: "D" },
    { size: "sm", value: "F" },
    { size: "sm", value: "G" },
    { size: "sm", value: "H" },
    { size: "sm", value: "J" },
    { size: "sm", value: "K" },
    { size: "sm", value: "L" },
  ],
  [
    { size: "lg", value: "Enter" },
    { size: "sm", value: "Z" },
    { size: "sm", value: "X" },
    { size: "sm", value: "C" },
    { size: "sm", value: "V" },
    { size: "sm", value: "B" },
    { size: "sm", value: "N" },
    { size: "sm", value: "M" },
    { size: "lg", value: "Del" },
  ],
];

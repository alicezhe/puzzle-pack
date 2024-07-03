import { State } from "@/models/wordle";
import WordleReducer, { initialState } from "@/reducers/wordle";
import { PropsWithChildren, createContext, useReducer } from "react";

export const WordleContext = createContext({
  state: {} as State,
  dispatch: {} as any,
});

const WordleProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(WordleReducer, initialState);

  return (
    <WordleContext.Provider value={{ state, dispatch }}>
      {children}
    </WordleContext.Provider>
  );
};

export default WordleProvider;

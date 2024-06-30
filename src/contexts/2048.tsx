import {
  mergeAnimationDuration,
  tilesPerDimension,
} from "@/components/2048/constants";
import { Tile } from "@/models/2048";
import Puzzle2048Reducer, { initialState } from "@/reducers/2048";
import { isNil, throttle } from "lodash";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";

type MoveDirection = "move_up" | "move_down" | "move_left" | "move_right";

export const Puzzle2048Context = createContext({
  getTiles: () => [] as Tile[],
  moveTiles: (_: MoveDirection) => {},
  startGame: () => {},
  restartGame: () => {},
  score: 0,
});

export default function Puzzle2048Provider({ children }: PropsWithChildren) {
  const [gameState, dispatch] = useReducer(Puzzle2048Reducer, initialState);

  const getEmptyCells = () => {
    const results: [number, number][] = [];

    for (let x = 0; x < tilesPerDimension; x++) {
      for (let y = 0; y < tilesPerDimension; y++) {
        if (isNil(gameState.board[y][x])) {
          results.push([x, y]);
        }
      }
    }

    return results;
  };

  const generateRandomTile = () => {
    const emptyCells = getEmptyCells();
    if (emptyCells.length > 0) {
      const index = Math.floor(Math.random() * emptyCells.length);
      const newTile = {
        position: emptyCells[index],
        value: 2,
      };
      dispatch({ type: "create_tile", tile: newTile });
    }
  };

  const getTiles = () => {
    return gameState.tilesByIds.map((tileId) => gameState.tiles[tileId]);
  };

  const moveTiles = useCallback(
    throttle(
      (type: MoveDirection) => dispatch({ type }),
      mergeAnimationDuration * 1.05,
      { trailing: false },
    ),
    [dispatch],
  );

  const startGame = () => {
    dispatch({ type: "create_tile", tile: { position: [0, 1], value: 2 } });
    dispatch({ type: "create_tile", tile: { position: [0, 2], value: 2 } });
  };

  const restartGame = () => {
    console.log("restarting");
    dispatch({ type: "restart" });
    startGame();
  };

  useEffect(() => {
    if (gameState.hasChanged) {
      setTimeout(() => {
        dispatch({ type: "clean_up" });
        generateRandomTile();
      }, mergeAnimationDuration);
    }
  }, [gameState.hasChanged]);

  return (
    <Puzzle2048Context.Provider
      value={{
        getTiles,
        moveTiles,
        startGame,
        score: gameState.score,
        restartGame,
      }}
    >
      {children}
    </Puzzle2048Context.Provider>
  );
}

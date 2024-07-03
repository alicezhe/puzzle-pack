import { tilesPerDimension } from "@/constants/2048";
import { Tile, TileMap } from "@/models/2048";
import { flattenDeep, isEqual, isNil } from "lodash";
import { uid } from "uid";

type State = {
  board: string[][];
  tiles: TileMap;
  tilesByIds: string[];
  hasChanged: boolean;
  score: number;
};

type Action =
  | { type: "create_tile"; tile: Tile }
  | { type: "move_up" }
  | { type: "move_down" }
  | { type: "move_left" }
  | { type: "move_right" }
  | { type: "clean_up" }
  | { type: "restart" };

export const initialState: State = {
  board: createBoard(),
  tiles: {},
  tilesByIds: [],
  hasChanged: false,
  score: 0,
};

function createBoard() {
  const board: string[][] = [];

  for (let i = 0; i < tilesPerDimension; i++) {
    board[i] = new Array(tilesPerDimension).fill(undefined);
  }

  return board;
}

export default function Puzzle2048Reducer(
  state: State = initialState,
  action: Action,
) {
  switch (action.type) {
    case "create_tile": {
      const tileId = uid();
      const [x, y] = action.tile.position;
      const newBoard = JSON.parse(JSON.stringify(state.board));
      newBoard[y][x] = tileId;

      return {
        ...state,
        board: newBoard,
        tiles: {
          ...state.tiles,
          [tileId]: {
            id: tileId,
            ...action.tile,
          },
        },
        tilesByIds: [...state.tilesByIds, tileId],
      };
    }
    case "move_up": {
      const newBoard = createBoard();
      const newTiles: TileMap = {};
      let hasChanged = false;
      let { score } = state;

      for (let x = 0; x < tilesPerDimension; x++) {
        let newY = 0;
        let previousTile: Tile | undefined;

        for (let y = 0; y < tilesPerDimension; y++) {
          const tileId = state.board[y][x];
          const currentTile = state.tiles[tileId];

          if (!isNil(tileId)) {
            if (previousTile?.value === currentTile.value) {
              score += previousTile.value * 2;
              newTiles[previousTile.id as string] = {
                ...previousTile,
                value: previousTile.value * 2,
              };
              newTiles[tileId] = { ...currentTile, position: [x, newY - 1] };
              previousTile = undefined;
              hasChanged = true;
              continue;
            }

            newBoard[newY][x] = tileId;
            newTiles[tileId] = { ...currentTile, position: [x, newY] };
            previousTile = newTiles[tileId];

            if (!isEqual(currentTile.position, [x, newY])) {
              hasChanged = true;
            }

            newY++;
          }
        }
      }

      return {
        ...state,
        board: newBoard,
        tiles: newTiles,
        hasChanged,
        score,
      };
    }
    case "move_down": {
      const newBoard = createBoard();
      const newTiles: TileMap = {};
      let hasChanged = false;
      let { score } = state;

      for (let x = 0; x < tilesPerDimension; x++) {
        let newY = tilesPerDimension - 1;
        let previousTile: Tile | undefined;

        for (let y = tilesPerDimension - 1; y >= 0; y--) {
          const tileId = state.board[y][x];
          const currentTile = state.tiles[tileId];

          if (!isNil(tileId)) {
            if (previousTile?.value === currentTile.value) {
              score += previousTile.value * 2;
              newTiles[previousTile.id as string] = {
                ...previousTile,
                value: previousTile.value * 2,
              };
              newTiles[tileId] = { ...currentTile, position: [x, newY + 1] };
              previousTile = undefined;
              hasChanged = true;
              continue;
            }

            newBoard[newY][x] = tileId;
            newTiles[tileId] = { ...currentTile, position: [x, newY] };
            previousTile = newTiles[tileId];

            if (!isEqual(currentTile.position, [x, newY])) {
              hasChanged = true;
            }

            newY--;
          }
        }
      }

      return {
        ...state,
        board: newBoard,
        tiles: newTiles,
        hasChanged,
        score,
      };
    }
    case "move_left": {
      const newBoard = createBoard();
      const newTiles: TileMap = {};
      let hasChanged = false;
      let { score } = state;

      for (let y = 0; y < tilesPerDimension; y++) {
        let newX = 0;
        let previousTile: Tile | undefined;

        for (let x = 0; x < tilesPerDimension; x++) {
          const tileId = state.board[y][x];
          const currentTile = state.tiles[tileId];

          if (!isNil(tileId)) {
            if (previousTile?.value === currentTile.value) {
              score += previousTile.value * 2;
              newTiles[previousTile.id as string] = {
                ...previousTile,
                value: previousTile.value * 2,
              };
              newTiles[tileId] = { ...currentTile, position: [newX - 1, y] };
              previousTile = undefined;
              hasChanged = true;
              continue;
            }

            newBoard[y][newX] = tileId;
            newTiles[tileId] = { ...currentTile, position: [newX, y] };
            previousTile = newTiles[tileId];

            if (!isEqual(currentTile.position, [newX, y])) {
              hasChanged = true;
            }

            newX++;
          }
        }
      }

      return {
        ...state,
        board: newBoard,
        tiles: newTiles,
        hasChanged,
        score,
      };
    }
    case "move_right": {
      const newBoard = createBoard();
      const newTiles: TileMap = {};
      let hasChanged = false;
      let { score } = state;

      for (let y = 0; y < tilesPerDimension; y++) {
        let newX = tilesPerDimension - 1;
        let previousTile: Tile | undefined;

        for (let x = tilesPerDimension - 1; x >= 0; x--) {
          const tileId = state.board[y][x];
          const currentTile = state.tiles[tileId];

          if (!isNil(tileId)) {
            if (previousTile?.value === currentTile.value) {
              score += previousTile.value * 2;
              newTiles[previousTile.id as string] = {
                ...previousTile,
                value: previousTile.value * 2,
              };
              newTiles[tileId] = { ...currentTile, position: [newX + 1, y] };
              previousTile = undefined;
              hasChanged = true;
              continue;
            }

            newBoard[y][newX] = tileId;
            newTiles[tileId] = { ...currentTile, position: [newX, y] };
            previousTile = newTiles[tileId];

            if (!isEqual(currentTile.position, [newX, y])) {
              hasChanged = true;
            }

            newX--;
          }
        }
      }

      return {
        ...state,
        board: newBoard,
        tiles: newTiles,
        hasChanged,
        score,
      };
    }
    case "clean_up": {
      const flattenBoard = flattenDeep(state.board);
      const newTiles: TileMap = flattenBoard.reduce(
        (result, tileId: string) => {
          if (isNil(tileId)) {
            return result;
          }
          return {
            ...result,
            [tileId]: state.tiles[tileId],
          };
        },
        {},
      );

      return {
        ...state,
        tiles: newTiles,
        tilesByIds: Object.keys(newTiles),
        hasChanged: false,
      };
    }
    case "restart": {
      return initialState;
    }
    default:
      return state;
  }
}

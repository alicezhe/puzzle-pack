"use client";

import { useCallback, useContext, useEffect, useRef } from "react";
import styles from "../../styles/2048.module.css";
import Tile from "./tile";
import { Tile as TileModel } from "@/models/2048";
import { Puzzle2048Context } from "@/contexts/2048";
import MobileSwiper, { SwipeInput } from "./mobile-swiper";

export default function Board() {
  const { getTiles, moveTiles, startGame } = useContext(Puzzle2048Context);
  const initalized = useRef(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();

      switch (e.code) {
        case "ArrowUp":
          moveTiles("move_up");
          break;
        case "KeyW":
          moveTiles("move_up");
          break;
        case "ArrowDown":
          moveTiles("move_down");
          break;
        case "KeyS":
          moveTiles("move_down");
          break;
        case "ArrowLeft":
          moveTiles("move_left");
          break;
        case "KeyA":
          moveTiles("move_left");
          break;
        case "ArrowRight":
          moveTiles("move_right");
          break;
        case "KeyD":
          moveTiles("move_right");
          break;
      }
    },
    [moveTiles],
  );

  const handleSwipe = useCallback(
    ({ deltaX, deltaY }: SwipeInput) => {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          moveTiles("move_right");
        } else {
          moveTiles("move_left");
        }
      } else {
        if (deltaY > 0) {
          moveTiles("move_down");
        } else {
          moveTiles("move_up");
        }
      }
    },
    [moveTiles],
  );

  const renderGrid = () => {
    const cells: JSX.Element[] = [];
    const totalCellCount = 16;

    for (let i = 0; i < totalCellCount; i++) {
      cells.push(<div className={styles.cell} key={i} />);
    }

    return cells;
  };

  const renderTiles = () => {
    return Object.values(getTiles()).map((tile: TileModel) => {
      return <Tile key={`${tile.id}`} {...tile} />;
    });
  };

  useEffect(() => {
    if (!initalized.current) {
      startGame();
      initalized.current = true;
    }
  }, [startGame]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <MobileSwiper onSwipe={handleSwipe}>
      <div className={styles.board}>
        <div className={styles.tiles}>{renderTiles()}</div>
        <div className={styles.grid}>{renderGrid()}</div>
      </div>
    </MobileSwiper>
  );
}

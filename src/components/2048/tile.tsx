import { Tile as TileProps } from "@/models/2048";
import styles from "../../styles/2048.module.css";
import {
  tilesPerDimension,
  mergeAnimationDuration,
  containerWidthDesktop,
  containerWidthMobile,
} from "../../constants/2048";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Tile({ position, value }: TileProps) {
  const isWideScreen = useMediaQuery({ minWidth: 512 });
  const containerWidth = isWideScreen
    ? containerWidthDesktop
    : containerWidthMobile;

  const [scale, setScale] = useState(1);
  const previousValue = usePreviousProps(value);
  const hasChanged = previousValue != value;

  const positionToPixels = (position: number) => {
    return (position / tilesPerDimension) * containerWidth;
  };

  const positionStyles = {
    left: positionToPixels(position[0]),
    top: positionToPixels(position[1]),
    transform: `scale(${scale})`,
    zIndex: value,
  };

  useEffect(() => {
    if (hasChanged) {
      setScale(1.1);
      setTimeout(() => setScale(1), mergeAnimationDuration);
    }
  }, [hasChanged]);

  return (
    <div
      className={`${styles.tile} ${styles[`tile${value}`]}`}
      style={positionStyles}
    >
      {value}
    </div>
  );
}

function usePreviousProps<K = any>(value: K) {
  const ref = useRef<K>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

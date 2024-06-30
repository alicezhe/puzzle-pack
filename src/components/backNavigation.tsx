import BackIcon from "../../public/images/back";
import { useRouter } from "next/navigation";
import styles from "@/styles/back.module.css";

export default function BackNavigation({ fillColor }: any) {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className={styles.back}>
      <span className={styles.link}>
        <BackIcon fillColor={fillColor} />
      </span>
      Back to all games
    </button>
  );
}

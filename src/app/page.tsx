import Footer from "@/components/footer";
import styles from "@/styles/home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div>
          <h1 className={styles.heading}>Puzzle Pack</h1>
          <div className={styles.grid}>
            <Link href="/2048" className={styles.puzzle}>
              2048
            </Link>
            <div className={styles.puzzle}></div>
            <div className={styles.puzzle}></div>
            <div className={styles.puzzle}></div>
            <div className={styles.puzzle}></div>
            <div className={styles.puzzle}></div>
          </div>
        </div>
        <Footer fillColor={"#000000"} />
      </div>
    </div>
  );
}

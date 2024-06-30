import styles from "@/styles/footer.module.css";
import PortfolioIcon from "../../public/images/portfolio";
import GithubIcon from "../../public/images/github";

export default function Footer({ fillColor }: any) {
  return (
    <footer className={styles.footer}>
      <div>Made with ♥ by Alice</div>
      <div className={styles.links}>
        <a
          href="https://github.com/alicezhe"
          target="_blank"
          rel="noopener"
          className={styles.link}
        >
          <GithubIcon fillColor={fillColor} />
        </a>
        <a
          href="https://alicezhe.github.io/"
          target="_blank"
          rel="noopener"
          className={styles.link}
        >
          <PortfolioIcon fillColor={fillColor} />
        </a>
      </div>
    </footer>
  );
}

import { SiteContent } from "../../content/SiteContent";
import { Logger } from "../../logging/Logger";
import styles from "./SiteFooter.module.css";

export class SiteFooterController {
  public static logContactClick(): void {
    Logger.info(
      "logContactClick",
      `Opening mailto: ${SiteContent.contactEmail}`,
    );
  }
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.brand}>{SiteContent.brandName}</p>
          <p className={styles.legal}>{SiteContent.legalName}</p>
        </div>
        <p className={styles.copy}>
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

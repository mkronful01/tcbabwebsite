import { SiteContent } from "../../content/SiteContent";
import { Logger } from "../../logging/Logger";
import styles from "./AboutCopySection.module.css";

export class AboutCopySectionController {
  public static logRender(): void {
    Logger.info("logRender", "Rendering about copy section", {
      paragraphCount: SiteContent.about.paragraphs.length,
    });
  }
}

export function AboutCopySection() {
  AboutCopySectionController.logRender();

  return (
    <section className={`section ${styles.section}`} aria-label="About copy">
      <div className={`section__inner ${styles.inner} reveal`}>
        {SiteContent.about.paragraphs.map((paragraph) => (
          <p key={paragraph} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

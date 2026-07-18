import { PageIntro } from "../components/layout/PageIntro";
import { PageShell } from "../components/layout/PageShell";
import { AboutCopySection } from "../components/sections/AboutCopySection";
import { SiteContent } from "../content/SiteContent";
import { Logger } from "../logging/Logger";
import styles from "./AboutPage.module.css";

export class AboutPageController {
  public static logMount(): void {
    Logger.info("logMount", "About page mounted without film");
  }
}

export function AboutPage() {
  AboutPageController.logMount();
  const { about } = SiteContent;

  return (
    <PageShell headerTone="light">
      <div className={styles.page}>
        <PageIntro label={about.label} title={about.title} lead={about.lead} />
        <AboutCopySection />
      </div>
    </PageShell>
  );
}

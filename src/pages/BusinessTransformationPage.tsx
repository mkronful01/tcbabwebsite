import { PageIntro } from "../components/layout/PageIntro";
import { PageShell } from "../components/layout/PageShell";
import { TopicListSection } from "../components/sections/TopicListSection";
import { SiteContent } from "../content/SiteContent";
import { Logger } from "../logging/Logger";
import styles from "./TopicPage.module.css";

export class BusinessTransformationPageController {
  public static logMount(): void {
    Logger.info("logMount", "Business Transformation page mounted");
  }
}

export function BusinessTransformationPage() {
  BusinessTransformationPageController.logMount();
  const { transformation } = SiteContent;

  return (
    <PageShell headerTone="light">
      <div className={styles.page}>
        <PageIntro
          label={transformation.label}
          title={transformation.title}
          lead={transformation.lead}
        />
        <TopicListSection
          label={transformation.label}
          items={transformation.items}
        />
      </div>
    </PageShell>
  );
}

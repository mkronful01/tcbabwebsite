import { PageIntro } from "../components/layout/PageIntro";
import { PageShell } from "../components/layout/PageShell";
import { TopicListSection } from "../components/sections/TopicListSection";
import { SiteContent } from "../content/SiteContent";
import { Logger } from "../logging/Logger";
import styles from "./TopicPage.module.css";

export class ConsultingServicesPageController {
  public static logMount(): void {
    Logger.info("logMount", "Consulting Services page mounted");
  }
}

export function ConsultingServicesPage() {
  ConsultingServicesPageController.logMount();
  const { consulting } = SiteContent;

  return (
    <PageShell headerTone="light">
      <div className={styles.page}>
        <PageIntro
          label={consulting.label}
          title={consulting.title}
          lead={consulting.lead}
        />
        <TopicListSection label={consulting.label} items={consulting.items} />
      </div>
    </PageShell>
  );
}

import { PageIntro } from "../components/layout/PageIntro";
import { PageShell } from "../components/layout/PageShell";
import { ContactSection } from "../components/sections/ContactSection";
import { SiteContent } from "../content/SiteContent";
import { Logger } from "../logging/Logger";
import styles from "./ContactPage.module.css";

export class ContactPageController {
  public static logMount(): void {
    Logger.info("logMount", "Contact page mounted");
  }
}

export function ContactPage() {
  ContactPageController.logMount();
  const { contact } = SiteContent;

  return (
    <PageShell headerTone="light">
      <div className={styles.page}>
        <PageIntro label={contact.label} title={contact.title} />
        <ContactSection showHeading={false} />
      </div>
    </PageShell>
  );
}

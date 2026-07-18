import { SiteContent } from "../../content/SiteContent";
import { Logger } from "../../logging/Logger";
import styles from "./ContactSection.module.css";

export class ContactSectionController {
  public static logMount(showHeading: boolean): void {
    Logger.info("logMount", "Contact section rendered", { showHeading });
  }

  public static logMailto(): void {
    Logger.info(
      "logMailto",
      `Opening contact mailto: ${SiteContent.contactEmail}`,
    );
  }
}

type ContactSectionProps = {
  showHeading?: boolean;
};

export function ContactSection({ showHeading = true }: ContactSectionProps) {
  ContactSectionController.logMount(showHeading);
  const { contact } = SiteContent;

  return (
    <section className={`section ${styles.section}`} aria-label="Contact">
      <div className={`section__inner ${styles.inner} reveal`}>
        {showHeading ? (
          <>
            <p className="section__label">{contact.label}</p>
            <h2 className={styles.title}>{contact.title}</h2>
          </>
        ) : null}
        <a
          className={styles.email}
          href={`mailto:${SiteContent.contactEmail}`}
          onClick={() => ContactSectionController.logMailto()}
        >
          {SiteContent.contactEmail}
        </a>
        <p className={styles.support}>{contact.support}</p>
      </div>
    </section>
  );
}

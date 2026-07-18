import type { TopicItem } from "../../content/SiteContent";
import { Logger } from "../../logging/Logger";
import styles from "./TopicListSection.module.css";

export class TopicListSectionController {
  public static logRender(count: number, label: string): void {
    Logger.info("logRender", "Rendering topic list section", {
      count,
      label,
    });
  }
}

type TopicListSectionProps = {
  label: string;
  items: TopicItem[];
};

export function TopicListSection({ label, items }: TopicListSectionProps) {
  TopicListSectionController.logRender(items.length, label);

  return (
    <section className={`section ${styles.section}`} aria-label={label}>
      <div className="section__inner">
        <ol className={`${styles.list} reveal`}>
          {items.map((item, index) => (
            <li key={item.id} className={styles.item}>
              <span className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.copy}>
                <h2 className={styles.itemTitle}>{item.title}</h2>
                <p className={styles.itemText}>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

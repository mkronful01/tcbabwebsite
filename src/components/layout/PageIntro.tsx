import styles from "./PageIntro.module.css";

type PageIntroProps = {
  label: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark";
};

export function PageIntro({
  label,
  title,
  lead,
  tone = "light",
}: PageIntroProps) {
  return (
    <header
      className={`${styles.intro} ${tone === "dark" ? styles.dark : styles.light}`}
    >
      <div className={styles.inner}>
        <p className={`section__label ${styles.label}`}>{label}</p>
        <h1 className={styles.title}>{title}</h1>
        {lead ? <p className={styles.lead}>{lead}</p> : null}
      </div>
    </header>
  );
}

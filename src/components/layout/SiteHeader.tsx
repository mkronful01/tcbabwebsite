import { NavLink } from "react-router-dom";
import { SiteContent } from "../../content/SiteContent";
import { Logger } from "../../logging/Logger";
import styles from "./SiteHeader.module.css";

export class SiteHeaderController {
  public static logNav(label: string, path: string): void {
    Logger.info("logNav", `Header navigation: ${label}`, { path });
  }
}

type SiteHeaderProps = {
  tone?: "dark" | "light";
  showBrand?: boolean;
};

export function SiteHeader({
  tone = "dark",
  showBrand = true,
}: SiteHeaderProps) {
  return (
    <header
      className={`${styles.header} ${tone === "light" ? styles.light : styles.dark}`}
    >
      <div className={`${styles.inner} ${showBrand ? "" : styles.innerNavOnly}`}>
        {showBrand ? (
          <NavLink
            to="/"
            className={styles.brand}
            onClick={() => SiteHeaderController.logNav("Brand", "/")}
          >
            <img
              className={styles.logo}
              src={SiteContent.logoMarkSrc}
              alt=""
              width={36}
              height={36}
            />
            <span className={styles.brandText}>
              Business <em>&amp; Beyond</em>
            </span>
          </NavLink>
        ) : (
          <span className={styles.brandSpacer} aria-hidden="true" />
        )}

        <nav className={styles.nav} aria-label="Primary">
          {SiteContent.navItems.map((item) => (
            <NavLink
              key={item.path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
              }
              to={item.path}
              end={item.path === "/"}
              onClick={() => SiteHeaderController.logNav(item.label, item.path)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

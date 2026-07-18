import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SiteContent } from "../../content/SiteContent";
import { Logger } from "../../logging/Logger";
import styles from "./SiteHeader.module.css";

export class SiteHeaderController {
  public static logNav(label: string, path: string): void {
    Logger.info("logNav", `Header navigation: ${label}`, { path });
  }

  public static logMenuToggle(open: boolean): void {
    Logger.info("logMenuToggle", `Mobile menu open -> ${open}`);
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    Logger.info("SiteHeader", "Locking body scroll while mobile menu is open");
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900 && menuOpen) {
        Logger.info("SiteHeader", "Closing mobile menu on desktop width");
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  const closeMenu = () => {
    if (menuOpen) {
      SiteHeaderController.logMenuToggle(false);
      setMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    const next = !menuOpen;
    SiteHeaderController.logMenuToggle(next);
    setMenuOpen(next);
  };

  return (
    <header
      className={`${styles.header} ${tone === "light" ? styles.light : styles.dark} ${menuOpen ? styles.menuOpen : ""}`}
    >
      <div className={`${styles.inner} ${showBrand ? "" : styles.innerNavOnly}`}>
        {showBrand ? (
          <NavLink
            to="/"
            className={styles.brand}
            onClick={() => {
              SiteHeaderController.logNav("Brand", "/");
              closeMenu();
            }}
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
          <NavLink
            to="/"
            className={styles.brandMobileHome}
            onClick={() => {
              SiteHeaderController.logNav("Home", "/");
              closeMenu();
            }}
          >
            Home
          </NavLink>
        )}

        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
        >
          <span className={styles.menuBtnBar} />
          <span className={styles.menuBtnBar} />
          <span className={styles.menuBtnBar} />
        </button>

        <nav
          id="primary-nav"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="Primary"
        >
          {SiteContent.navItems.map((item) => (
            <NavLink
              key={item.path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
              }
              to={item.path}
              end={item.path === "/"}
              onClick={() => {
                SiteHeaderController.logNav(item.label, item.path);
                closeMenu();
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

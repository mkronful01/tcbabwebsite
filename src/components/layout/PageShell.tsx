import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { Logger } from "../../logging/Logger";
import styles from "./PageShell.module.css";

export class PageShellController {
  public static logMount(
    hideFooter: boolean,
    headerTone: "dark" | "light",
    showBrand: boolean,
  ): void {
    Logger.info("logMount", "Page shell rendered", {
      hideFooter,
      headerTone,
      showBrand,
    });
  }
}

type PageShellProps = {
  children: ReactNode;
  hideFooter?: boolean;
  headerTone?: "dark" | "light";
  showBrand?: boolean;
};

export function PageShell({
  children,
  hideFooter = false,
  headerTone = "light",
  showBrand = true,
}: PageShellProps) {
  PageShellController.logMount(hideFooter, headerTone, showBrand);

  return (
    <div className={styles.shell}>
      <SiteHeader tone={headerTone} showBrand={showBrand} />
      <main className={styles.main}>{children}</main>
      {hideFooter ? null : <SiteFooter />}
    </div>
  );
}

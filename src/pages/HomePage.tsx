import { PageShell } from "../components/layout/PageShell";
import { LogoVideoHero } from "../components/video/LogoVideoHero";
import { Logger } from "../logging/Logger";

export class HomePageController {
  public static logMount(): void {
    Logger.info("logMount", "Home page mounted with logo hero only");
  }
}

export function HomePage() {
  HomePageController.logMount();

  return (
    <PageShell headerTone="dark" hideFooter showBrand={false}>
      <LogoVideoHero />
    </PageShell>
  );
}

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SiteContent } from "../../content/SiteContent";
import { Logger } from "../../logging/Logger";
import styles from "./LogoVideoHero.module.css";

export class LogoVideoHeroController {
  public static readonly lowVolume = 0.18;

  public static applyLowVolume(video: HTMLVideoElement): void {
    video.volume = LogoVideoHeroController.lowVolume;
    Logger.info(
      "applyLowVolume",
      `Logo video volume set to ${LogoVideoHeroController.lowVolume}`,
    );
  }

  public static async startPlayback(
    video: HTMLVideoElement,
  ): Promise<{ muted: boolean }> {
    Logger.info(
      "startPlayback",
      "Starting hero playback muted for reliable Netlify/browser autoplay",
    );
    video.playsInline = true;
    video.disableRemotePlayback = true;
    video.muted = true;
    LogoVideoHeroController.applyLowVolume(video);

    try {
      await video.play();
      Logger.info(
        "startPlayback",
        "Muted hero playback started successfully",
      );
      // Stay muted until the user taps Sound — unmuting without a gesture
      // often pauses playback on Chrome/Safari/Netlify HTTPS.
      return { muted: true };
    } catch (error) {
      Logger.warn("startPlayback", "Autoplay blocked or failed", error);
      return { muted: true };
    }
  }

  public static toggleMute(video: HTMLVideoElement, muted: boolean): boolean {
    const nextMuted = !muted;
    video.muted = nextMuted;
    if (!nextMuted) {
      LogoVideoHeroController.applyLowVolume(video);
      void video.play().catch((error) => {
        Logger.warn("toggleMute", "Play after unmute failed", error);
      });
    }
    Logger.info("toggleMute", `Hero video muted -> ${nextMuted}`);
    return nextMuted;
  }

  public static togglePlay(
    video: HTMLVideoElement,
    isPlaying: boolean,
  ): boolean {
    if (isPlaying) {
      video.pause();
      Logger.info("togglePlay", "Hero video paused");
      return false;
    }

    void video.play().catch((error) => {
      Logger.warn("togglePlay", "Resume play failed", error);
    });
    Logger.info("togglePlay", "Hero video resumed");
    return true;
  }

  public static handleCta(label: string, path: string): void {
    Logger.info("handleCta", `Hero CTA clicked: ${label}`, { path });
  }
}

export function LogoVideoHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const { hero } = SiteContent;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      Logger.warn("LogoVideoHero", "Video element ref is null");
      return;
    }

    Logger.info("LogoVideoHero", "Mounting home video hero", {
      src: SiteContent.logoVideoSrc,
    });

    const onPlaying = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => {
      Logger.error("LogoVideoHero", "Video element error", {
        code: video.error?.code,
        message: video.error?.message,
        src: video.currentSrc || video.src,
      });
    };

    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);
    video.addEventListener("error", onError);

    void LogoVideoHeroController.startPlayback(video).then((result) => {
      Logger.info(
        "LogoVideoHero",
        `Playback settle state muted=${result.muted}`,
      );
      setMuted(result.muted);
    });

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("error", onError);
    };
  }, []);

  return (
    <section className={styles.hero} aria-label="Home video">
      <div className={styles.media}>
        <video
          ref={videoRef}
          className={styles.video}
          src={SiteContent.logoVideoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-label="Business and Beyond company film"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.brandBlock}>
          <img
            className={styles.logoMark}
            src={SiteContent.logoMarkSrc}
            alt={SiteContent.brandName}
            width={88}
            height={88}
          />
        </div>

        <h1 className={styles.headline}>{hero.headline}</h1>
        <p className={styles.support}>{hero.support}</p>

        <div className={styles.actions}>
          <Link
            className="btn btn--primary"
            to={hero.primaryCta.path}
            onClick={() =>
              LogoVideoHeroController.handleCta(
                hero.primaryCta.label,
                hero.primaryCta.path,
              )
            }
          >
            {hero.primaryCta.label}
          </Link>
          <Link
            className="btn btn--ghost"
            to={hero.secondaryCta.path}
            onClick={() =>
              LogoVideoHeroController.handleCta(
                hero.secondaryCta.label,
                hero.secondaryCta.path,
              )
            }
          >
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.controlBtn}
          onClick={() => {
            const video = videoRef.current;
            if (!video) {
              Logger.warn("togglePlay", "Play control clicked with null video");
              return;
            }
            setPlaying(LogoVideoHeroController.togglePlay(video, playing));
          }}
        >
          {playing ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          className={styles.controlBtn}
          onClick={() => {
            const video = videoRef.current;
            if (!video) {
              Logger.warn("toggleMute", "Mute control clicked with null video");
              return;
            }
            setMuted(LogoVideoHeroController.toggleMute(video, muted));
          }}
        >
          {muted ? "Sound" : "Mute"}
        </button>
      </div>

      <div className={styles.accentBar} aria-hidden="true" />
    </section>
  );
}

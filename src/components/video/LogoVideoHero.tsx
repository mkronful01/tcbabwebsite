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
      "Attempting logo hero autoplay with low-volume sound",
    );
    video.playsInline = true;
    LogoVideoHeroController.applyLowVolume(video);
    video.muted = false;

    try {
      await video.play();
      Logger.info(
        "startPlayback",
        "Logo hero playback started with sound at low volume",
      );
      return { muted: false };
    } catch (soundError) {
      Logger.warn(
        "startPlayback",
        "Unmuted autoplay blocked; retrying muted",
        soundError,
      );
      video.muted = true;

      try {
        await video.play();
        Logger.info(
          "startPlayback",
          "Logo hero playback started muted after browser block",
        );
        return { muted: true };
      } catch (error) {
        Logger.warn("startPlayback", "Autoplay blocked or failed", error);
        return { muted: true };
      }
    }
  }

  public static toggleMute(video: HTMLVideoElement, muted: boolean): boolean {
    const nextMuted = !muted;
    video.muted = nextMuted;
    if (!nextMuted) {
      LogoVideoHeroController.applyLowVolume(video);
    }
    Logger.info("toggleMute", `Logo video muted -> ${nextMuted}`);
    return nextMuted;
  }

  public static togglePlay(
    video: HTMLVideoElement,
    isPlaying: boolean,
  ): boolean {
    if (isPlaying) {
      video.pause();
      Logger.info("togglePlay", "Logo video paused");
      return false;
    }

    void video.play();
    Logger.info("togglePlay", "Logo video resumed");
    return true;
  }

  public static handleCta(label: string, path: string): void {
    Logger.info("handleCta", `Hero CTA clicked: ${label}`, { path });
  }
}

export function LogoVideoHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { hero } = SiteContent;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      Logger.warn("LogoVideoHero", "Video element ref is null");
      return;
    }

    Logger.info("LogoVideoHero", "Mounting logo hero video", {
      src: SiteContent.logoVideoSrc,
      targetVolume: LogoVideoHeroController.lowVolume,
    });

    const onPlaying = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);

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
    };
  }, []);

  return (
    <section className={styles.hero} aria-label="Business and Beyond logo film">
      <div className={styles.media}>
        <video
          ref={videoRef}
          className={styles.video}
          src={SiteContent.logoVideoSrc}
          autoPlay
          loop
          playsInline
          preload="auto"
          aria-label="Business and Beyond animated logo"
        />
      </div>

      <div className={styles.bar}>
        <p className={styles.support}>{hero.support}</p>
        <div className={styles.actions}>
          <Link
            className="btn btn--ghost"
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
    </section>
  );
}

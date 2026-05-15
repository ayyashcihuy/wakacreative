"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ── YouTube IFrame API types ───────────────────────────── */
interface YTPlayer {
  getDuration(): number;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  playVideo(): void;
  mute(): void;
  destroy(): void;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLElement,
        cfg: {
          videoId: string;
          width?: string | number;
          height?: string | number;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (e: { target: YTPlayer }) => void;
          };
        }
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

/* ── Data ───────────────────────────────────────────────── */
const VIDEOS = [
  { id: "qKtpKx6Ljpc" },
  { id: "QHcnUFN9Kjc" },
  { id: "9GIhNPfSRq8" },
  { id: "hocAq0njyVU" },
  { id: "MTWs0gtU5m8" },
];

function thumb(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

/* ── Component ──────────────────────────────────────────── */
export default function VideoSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [apiReady, setApiReady] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);

  /* Load YouTube IFrame API once */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.YT?.Player) { setApiReady(true); return; }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      setApiReady(true);
    };
  }, []);

  /* Create/replace player whenever activeIdx or apiReady changes */
  useEffect(() => {
    if (!apiReady || !wrapperRef.current) return;

    /* Destroy previous player */
    if (playerRef.current) {
      try { playerRef.current.destroy(); } catch (_) { }
      playerRef.current = null;
    }

    /* Fresh mount point */
    wrapperRef.current.innerHTML = "";
    const el = document.createElement("div");
    el.style.width = "100%";
    el.style.height = "100%";
    wrapperRef.current.appendChild(el);

    playerRef.current = new window.YT.Player(el, {
      videoId: VIDEOS[activeIdx].id,
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
        showinfo: 0,
        iv_load_policy: 3,
      },
      events: {
        onReady: (e) => {
          const dur = e.target.getDuration();
          if (dur > 0) e.target.seekTo(dur / 2, true);
          e.target.mute();
          e.target.playVideo();
        },
      },
    });
  }, [apiReady, activeIdx]);

  /* Auto-advance every 10s; resets on every activeIdx change */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((p) => (p + 1) % VIDEOS.length);
    }, 10_000);
    return () => clearInterval(timer);
  }, [activeIdx]);

  const leftIdx = (activeIdx - 1 + VIDEOS.length) % VIDEOS.length;
  const rightIdx = (activeIdx + 1) % VIDEOS.length;

  return (
    <section
      id="videos"
      className="w-full py-24 sm:py-32 px-8 sm:px-12 lg:px-20 flex flex-col gap-12 sm:gap-16"
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="text-[10px] text-accent uppercase tracking-[0.35em] mb-2">
          our work
        </p>
        <h2 className="text-5xl sm:text-7xl lg:text-[9rem] font-black uppercase leading-none tracking-tight text-foreground">
          OUR BEST
          <br />
          PROJECT
        </h2>
      </motion.div>

      {/* 3-panel video display */}
      <motion.div
        className="flex items-center gap-3 sm:gap-4"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
      >
        {/* Left thumbnail */}
        <button
          className="hidden sm:block w-[22%] aspect-video rounded-xl overflow-hidden opacity-35 hover:opacity-55 transition-all duration-300 flex-shrink-0 scale-95 hover:scale-100"
          onClick={() => setActiveIdx(leftIdx)}
          aria-label="Previous video"
        >
          <img
            src={thumb(VIDEOS[leftIdx].id)}
            alt=""
            className="w-full h-full object-cover"
          />
        </button>

        {/* Center: active YouTube player */}
        <div className="flex-1 aspect-video rounded-2xl overflow-hidden bg-onyx relative ring-1 ring-border">
          <div
            ref={wrapperRef}
            className="absolute inset-0 [&>div]:w-full [&>div]:h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0"
          />
        </div>

        {/* Right thumbnail */}
        <button
          className="hidden sm:block w-[22%] aspect-video rounded-xl overflow-hidden opacity-35 hover:opacity-55 transition-all duration-300 flex-shrink-0 scale-95 hover:scale-100"
          onClick={() => setActiveIdx(rightIdx)}
          aria-label="Next video"
        >
          <img
            src={thumb(VIDEOS[rightIdx].id)}
            alt=""
            className="w-full h-full object-cover"
          />
        </button>
      </motion.div>

      {/* Dots navigation */}
      <motion.div
        className="flex justify-center items-center gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`rounded-full transition-all duration-300 ${i === activeIdx
                ? "w-8 h-2.5 bg-accent"
                : "w-2.5 h-2.5 bg-foreground/25 hover:bg-foreground/50"
              }`}
            aria-label={`Video ${i + 1}`}
          />
        ))}
      </motion.div>
    </section>
  );
}

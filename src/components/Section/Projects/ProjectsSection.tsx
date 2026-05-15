"use client";

import { motion } from "framer-motion";
import { StaticImageData } from "next/image";
import { PROJECT_IMAGES } from "@/constants/projectImages";
import ProjectCarouselRow from "./ProjectCarouselRow";

function buildRows(images: StaticImageData[], rowCount: number): StaticImageData[][] {
  const perRow = Math.max(Math.ceil(images.length / rowCount), 15);
  const total = images.length;
  return Array.from({ length: rowCount }, (_, rowIdx) => {
    const start = Math.floor((rowIdx / rowCount) * total);
    return Array.from({ length: perRow }, (_, i) => images[(start + i) % total]);
  });
}

const DESKTOP_ROWS = buildRows(PROJECT_IMAGES, 20);
const MOBILE_ROWS  = buildRows(PROJECT_IMAGES, 6);

const DESKTOP_DURATIONS = [100, 115, 100, 110, 105, 115, 100, 110, 105, 115,
                            100, 110, 105, 115, 100, 110, 105, 115, 100, 110];
const MOBILE_DURATIONS  = [100, 115, 105, 110, 100, 115];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* ── Desktop: 20 rows at -45deg ── */}
      <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vmax] -rotate-45 flex-col gap-2 pointer-events-none select-none">
        {DESKTOP_ROWS.map((row, i) => (
          <ProjectCarouselRow
            key={i}
            images={row}
            direction={i % 2 === 0 ? "left" : "right"}
            durationSec={DESKTOP_DURATIONS[i]}
          />
        ))}
      </div>

      {/* ── Mobile: 6 rows, no tilt ── */}
      <div className="lg:hidden absolute inset-0 flex flex-col justify-evenly overflow-hidden pointer-events-none select-none">
        {MOBILE_ROWS.map((row, i) => (
          <ProjectCarouselRow
            key={i}
            images={row}
            direction={i % 2 === 0 ? "left" : "right"}
            durationSec={MOBILE_DURATIONS[i]}
          />
        ))}
      </div>

      {/* ── Dark overlay ── */}
      <div className="absolute inset-0 bg-background/45" />

      {/* ── Centered title ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-4 text-center px-6"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p
          className="text-[10px] text-accent/60 uppercase tracking-[0.3em] font-medium"
          variants={fadeUp}
        >
          And many more in the works...
        </motion.p>
        <motion.h2
          className="text-5xl sm:text-7xl lg:text-[9rem] font-black uppercase leading-none tracking-tight text-foreground/50"
          variants={fadeUp}
        >
          From Our Projects
        </motion.h2>
      </motion.div>
    </section>
  );
}

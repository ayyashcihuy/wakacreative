"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InfiniteCarousel from "./ImageCarousel";
import { CAROUSEL_ITEMS, CarouselItem } from "@/constants/carouselImages";

export default function HeroComponent() {
  const [hoveredItem, setHoveredItem] = useState<CarouselItem | null>(null);

  return (
    <section id="hero" className="w-full min-h-screen flex flex-col overflow-hidden">
      {/* Spacer for absolute navbar */}
      <div className="h-24 sm:h-28 flex-shrink-0" />

      {/* Carousel — vertically centered in remaining space */}
      <motion.div
        className="flex-1 flex items-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.35 }}
      >
        <InfiniteCarousel items={CAROUSEL_ITEMS} onItemHover={setHoveredItem} />
      </motion.div>

      {/* Footer row */}
      <motion.div
        className="flex items-end justify-between px-8 sm:px-12 pb-10 sm:pb-14"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.55 }}
      >
        {/* Left descriptor — hidden on mobile */}
        <p className="hidden sm:block text-[10px] text-muted-foreground uppercase tracking-[0.2em] leading-relaxed max-w-[180px]">
          your one creative
          <br />
          solutions
        </p>

        {/* Right: reactive metadata + big CLIENT'S text */}
        <div className="flex items-end gap-6 ml-auto">
          {/* Reactive hover text — fades in/out */}
          <div className="text-right min-w-[110px]">
            <AnimatePresence mode="wait">
              {hoveredItem && (
                <motion.div
                  key={hoveredItem.title}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex flex-col gap-0.5"
                >
                  <span className="text-[10px] text-accent uppercase tracking-widest">
                    {hoveredItem.category}
                  </span>
                  <span className="text-sm text-foreground font-semibold leading-tight">
                    {hoveredItem.title}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* WAKA display text */}
          <div className="text-right">
            <h1 className="text-5xl sm:text-7xl lg:text-[9rem] font-black uppercase leading-none tracking-tight text-foreground">
              <span className="sr-only">Waka Creative — Jasa Video Production &amp; Foto Profesional di Bekasi</span>
              <span aria-hidden="true">WAKA</span>
            </h1>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

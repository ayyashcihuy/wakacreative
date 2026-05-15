"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import logo from "@/assets/logo/waka_logo.png";
import logoWide from "@/assets/logo/logo_wide.png";
import LiveClock from "./LiveClock";

export default function NavigationBar() {
  return (
    <>
      {/* Main nav bar */}
      <motion.nav
        className="flex flex-row px-6 sm:px-12 py-5 sm:py-6 items-center justify-between w-full absolute z-50 top-0"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        {/* Left: Logo */}
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Waka Creative"
            width={56}
            height={56}
            className="object-contain w-12 h-12 sm:w-14 sm:h-14"
          />
        </div>

        {/* Center: Location + Live clock — desktop only */}
        <div className="hidden md:flex flex-col items-center gap-0.5">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            BKS/INA
          </span>
          <LiveClock />
        </div>

        {/* Right: empty — CTA buttons are in FloatingActions */}
        <div className="w-12 sm:w-14" />
      </motion.nav>

      {/* Background watermark logo */}
      <div className="absolute z-10 -top-40 left-1 opacity-[0.04] pointer-events-none select-none">
        <Image
          src={logoWide}
          alt=""
          width={600}
          height={600}
          className="w-full h-full"
        />
      </div>
    </>
  );
}

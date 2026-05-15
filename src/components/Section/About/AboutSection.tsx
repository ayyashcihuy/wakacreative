"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import mobileMock from "@/assets/mobile_mock/mobile_mock.png";

const VIDEO_ID = "C2z02nlMUsg";
const PHONE_W = 260;
const PHONE_H = Math.round(PHONE_W * (1984 / 979)); // maintain PNG aspect ratio ≈ 527px

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

interface AboutSectionProps {
  title: string;
  description: string;
}

export default function AboutSection({ title, description }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center px-8 sm:px-14 lg:px-20 py-16 gap-12 lg:gap-20"
    >
      {/* Left: Phone mockup — fully visible */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: "easeOut" as const, delay: 0.1 }}
        style={{ position: "relative", width: PHONE_W, height: PHONE_H, flexShrink: 0 }}
      >
        {/* YouTube iframe — aligned to screen area of the PNG */}
        <iframe
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&playsinline=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3`}
          style={{
            position: "absolute",
            top: "3.5%",
            left: "6%",
            width: "88%",
            height: "93%",
            border: 0,
            borderRadius: 36,
          }}
          allow="autoplay; encrypted-media"
        />

        {/* PNG phone frame overlay */}
        <Image
          src={mobileMock}
          alt="Phone mockup"
          width={PHONE_W}
          height={PHONE_H}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            zIndex: 10,
            pointerEvents: "none",
          }}
          priority
        />

        {/* Transparent blocker — prevents YouTube hover UI from appearing */}
        <div style={{ position: "absolute", inset: 0, zIndex: 20, cursor: "default" }} />

        {/* 3D shadow below phone */}
        <div
          style={{
            position: "absolute",
            bottom: -20,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: 32,
            background: "rgba(0,0,0,0.5)",
            filter: "blur(18px)",
            borderRadius: "50%",
            zIndex: -1,
          }}
        />
      </motion.div>

      {/* Right: Title + Content */}
      <motion.div
        className="flex flex-col gap-4 sm:gap-5 max-w-lg text-left"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.p
          className="text-[10px] text-accent uppercase tracking-[0.35em] font-medium"
          variants={fadeUp}
        >
          Who we are
        </motion.p>

        <motion.h2
          className="text-2xl sm:text-4xl lg:text-[4.5rem] font-black uppercase leading-none tracking-tight text-foreground"
          variants={fadeUp}
        >
          {title}
        </motion.h2>

        <motion.p
          className="text-xs sm:text-sm text-muted-foreground leading-relaxed"
          variants={fadeUp}
        >
          {description.replace(/\n+/g, " ").trim()}
        </motion.p>
      </motion.div>
    </section>
  );
}

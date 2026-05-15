"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SERVICES } from "@/constants/services";
import ServiceDisplay from "./ServiceDisplay";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  function handleNext() {
    setActiveIndex((prev) => (prev + 1) % SERVICES.length);
  }

  return (
    <section
      id="services"
      className="w-full min-h-screen flex items-center justify-center px-6 sm:px-12 py-20 sm:py-28"
    >
      <div className="max-w-7xl w-full">
        <motion.div
          className="flex flex-col gap-12 lg:gap-16"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Header */}
          <motion.div className="flex flex-col gap-3" variants={stagger}>
            <motion.p
              className="text-[10px] text-accent uppercase tracking-[0.3em] font-medium"
              variants={fadeUp}
            >
              What we offer
            </motion.p>
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground leading-tight uppercase tracking-tight"
              variants={fadeUp}
            >
              Our Services
            </motion.h2>
          </motion.div>

          {/* Service display */}
          <motion.div variants={fadeUp}>
            <ServiceDisplay
              service={SERVICES[activeIndex]}
              index={activeIndex}
              total={SERVICES.length}
              onNext={handleNext}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Service } from "@/constants/services";

interface ServiceDisplayProps {
  service: Service;
  index: number;
  total: number;
  onNext: () => void;
}

export default function ServiceDisplay({
  service,
  index,
  total,
  onNext,
}: ServiceDisplayProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={service.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            {/* Category + counter */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-accent uppercase tracking-[0.3em] font-medium">
                {service.category}
              </span>
              <span className="text-[10px] text-muted-foreground font-mono tracking-widest">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight tracking-tight text-foreground">
              {service.title}
            </h3>

            {/* Divider */}
            <div className="w-full h-px bg-border opacity-40" />

            {/* Items */}
            <ul className="flex flex-col gap-3">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        {/* Nav row */}
        <div className="flex items-center justify-end pt-8">
          <button
            onClick={onNext}
            className="group flex items-center gap-2 border border-foreground/20 rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-foreground hover:border-accent hover:text-accent transition-all duration-200 active:scale-95 cursor-pointer"
          >
            Next
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
}

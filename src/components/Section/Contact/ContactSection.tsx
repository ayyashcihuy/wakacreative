"use client";

import { motion } from "framer-motion";
import { Mail, Instagram, Phone } from "lucide-react";

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email",
    lines: ["info@wakacreative.com", "wakacreative@gmail.com"],
    href: "mailto:info@wakacreative.com",
  },
  {
    icon: Instagram,
    label: "Social Media",
    lines: ["@waka.creative"],
    href: "https://instagram.com/waka.creative",
  },
  {
    icon: Phone,
    label: "Phone Number",
    lines: ["0813-8594-5720"],
    href: "https://wa.me/6281385945720?text=Hi%20Waka%20Creative%20I%20want%20to%20discuss",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full min-h-screen flex flex-col justify-between px-8 sm:px-12 lg:px-20 pt-24 sm:pt-32 pb-10 sm:pb-14"
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="text-[10px] text-accent uppercase tracking-[0.35em] mb-2">
          get in touch
        </p>
        <h2 className="text-5xl sm:text-7xl lg:text-[9rem] font-black uppercase leading-none tracking-tight text-foreground">
          CONTACT
          <br />
          US
        </h2>
      </motion.div>

      {/* Divider */}
      <motion.div
        className="w-full h-px bg-border my-12 sm:my-16"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      />

      {/* Contact cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 flex-1"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {CONTACT_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group flex flex-col gap-4 p-6 sm:p-8 rounded-2xl border border-border hover:border-accent/40 bg-onyx hover:bg-carbon-black transition-colors duration-300"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-full border border-border group-hover:border-accent/40 flex items-center justify-center transition-colors duration-300">
                <Icon size={16} className="text-muted-foreground group-hover:text-accent transition-colors duration-300" />
              </div>

              {/* Label */}
              <p className="text-[10px] text-accent uppercase tracking-[0.3em] font-medium">
                {item.label}
              </p>

              {/* Lines */}
              <div className="flex flex-col gap-1 mt-auto">
                {item.lines.map((line) => (
                  <span
                    key={line}
                    className="text-base sm:text-lg font-semibold text-foreground leading-snug"
                  >
                    {line}
                  </span>
                ))}
              </div>
            </motion.a>
          );
        })}
      </motion.div>

      {/* Bottom row */}
      <motion.div
        className="flex items-center justify-between mt-12 sm:mt-16 pt-8 border-t border-border"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      >
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.25em]">
          Waka Creative — BKS / INA
        </p>
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.25em]">
          We deliver your story
        </p>
      </motion.div>
    </section>
  );
}

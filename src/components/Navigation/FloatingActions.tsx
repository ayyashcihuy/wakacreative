"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Videos", id: "videos" },
  { label: "Projects", id: "projects" },
  { label: "Clients", id: "clients" },
  { label: "Contact", id: "contact" },
];

const WA_LINK =
  "https://wa.me/6281385945720?text=Hi%20Waka%20Creative%20I%20want%20to%20discuss";

function scrollToSection(id: string, onClose: () => void) {
  onClose();
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, 300);
}

export default function FloatingActions() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Floating buttons — fixed top-right */}
      <div className="fixed top-5 right-6 sm:top-6 sm:right-12 z-[100] flex items-center gap-2 sm:gap-3">
        {/* Connect With Us */}
        <motion.a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center px-4 py-2 rounded-full bg-accent text-accent-foreground text-[11px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity duration-150"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          CONNECT WITH US
        </motion.a>

        {/* Menu button */}
        <motion.button
          onClick={() => setMenuOpen(true)}
          className="flex items-center px-4 py-2 rounded-full border border-foreground/30 text-foreground text-[11px] font-black uppercase tracking-widest hover:border-foreground/60 transition-colors duration-150"
          aria-label="Open menu"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          MENU ☰
        </motion.button>
      </div>

      {/* Fullscreen nav overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[200] bg-background flex flex-col"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {/* Close button */}
            <div className="flex justify-end px-6 sm:px-12 py-5 sm:py-6">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-11 h-11 rounded-full border border-foreground/30 flex items-center justify-center hover:border-foreground/60 transition-colors duration-150"
                aria-label="Close menu"
              >
                <X size={18} className="text-foreground" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 gap-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id, () => setMenuOpen(false))}
                  className="group flex items-baseline gap-4 text-left w-fit"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 + i * 0.07 }}
                >
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest w-6 text-right">
                    0{i + 1}
                  </span>
                  <span className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-none tracking-tight text-foreground group-hover:text-accent transition-colors duration-200">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Bottom row */}
            <div className="px-8 sm:px-16 lg:px-24 pb-10 sm:pb-14 flex items-center justify-between">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.25em]">
                BKS / INA
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-[11px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity duration-150"
              >
                CONNECT WITH US
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

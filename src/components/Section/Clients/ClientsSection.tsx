"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import logo1 from "@/assets/clients_logo/20250923175703-2025-09-23websetting175650.png";
import logo2 from "@/assets/clients_logo/230622_230621_logo-website-bea-cukai.png";
import logo3 from "@/assets/clients_logo/BPJS_Ketenagakerjaan_logo.svg.png";
import logo4 from "@/assets/clients_logo/channels4_profile.jpg";
import logo5 from "@/assets/clients_logo/fIyYLOD4WzWdLeSfI1FpEHNSZ2I8UaRX6jVMqPtXwuQ.jpg";
import logo6 from "@/assets/clients_logo/logo-atas.png";
import logo7 from "@/assets/clients_logo/logo-ftke-bg.png";
import logo8 from "@/assets/clients_logo/logo1.png";
import logo9 from "@/assets/clients_logo/unnamed (1).png";
import logo10 from "@/assets/clients_logo/unnamed.png";

const LOGOS = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10];

export default function ClientsSection() {
  return (
    <section
      id="clients"
      className="w-full max-h-[600px] overflow-hidden bg-white flex flex-col items-center gap-10 py-14 sm:py-20"
    >
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Title */}
      <motion.div
        className="flex flex-col items-start w-full gap-1 px-8 sm:px-12 lg:px-20"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="text-[10px] text-accent uppercase tracking-[0.35em]">
          our portfolio
        </p>
        <h2 className="text-5xl sm:text-7xl lg:text-[9rem] font-black uppercase leading-none tracking-tight text-black">
          SATISFIED
          <br />
          CLIENTS
        </h2>
      </motion.div>

      {/* Infinite scroll marquee */}
      <motion.div
        className="w-full overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="marquee-track flex items-center gap-12 w-max">
          {[...LOGOS, ...LOGOS].map((src, i) => (
            <div key={i} className="flex-shrink-0 w-40 h-16 flex items-center justify-center px-2">
              <Image
                src={src}
                alt={`Client logo ${(i % LOGOS.length) + 1}`}
                className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                width={160}
                height={64}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

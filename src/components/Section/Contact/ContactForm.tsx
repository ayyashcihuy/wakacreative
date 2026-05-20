"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COOLDOWN_MS = 5 * 60 * 1000;
const STORAGE_KEY = "waka_form_last_submit";

function formatTime(ms: number): string {
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

type FormErrors = {
  name?: string;
  wa?: string;
  submit?: string;
};

export default function ContactForm() {
  const [name, setName] = useState("");
  const [wa, setWa] = useState("");
  const [concept, setConcept] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [cooldownMs, setCooldownMs] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    function tick() {
      const last = parseInt(sessionStorage.getItem(STORAGE_KEY) ?? "0", 10);
      const remaining = last + COOLDOWN_MS - Date.now();
      const clamped = remaining > 0 ? remaining : 0;
      setCooldownMs(clamped);
      if (clamped <= 0 && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    tick();
    timerRef.current = setInterval(tick, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isSubmitted && cooldownMs === 0) {
      setName("");
      setWa("");
      setConcept("");
      setErrors({});
      setIsSubmitted(false);
    }
  }, [cooldownMs, isSubmitted]);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/[^a-zA-Z\s]/g, "").slice(0, 20);
    setName(val);
    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
  }

  function handleWaChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, "").slice(0, 16);
    setWa(val);
    if (errors.wa) setErrors((prev) => ({ ...prev, wa: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (cooldownMs > 0 || isLoading) return;

    const newErrors: FormErrors = {};
    if (!name.trim()) newErrors.name = "Nama wajib diisi";
    if (!wa.trim()) {
      newErrors.wa = "Nomor WhatsApp wajib diisi";
    } else if (!wa.startsWith("08")) {
      newErrors.wa = "Nomor harus diawali dengan 08";
    } else if (wa.length < 10) {
      newErrors.wa = "Nomor terlalu pendek (min. 10 digit)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama: name.trim(), wa: wa.trim(), description: concept.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.error === "duplicate") {
          setErrors({
            wa: "Anda sudah pernah melakukan submission. Anda akan dihubungi oleh admin kami dalam beberapa saat.",
          });
        } else {
          setErrors({ submit: "Terjadi kesalahan. Silahkan coba lagi." });
        }
        return;
      }

      // Success — start cooldown
      sessionStorage.setItem(STORAGE_KEY, String(Date.now()));
      setCooldownMs(COOLDOWN_MS);
      setIsSubmitted(true);

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        const last = parseInt(sessionStorage.getItem(STORAGE_KEY) ?? "0", 10);
        const remaining = last + COOLDOWN_MS - Date.now();
        const clamped = remaining > 0 ? remaining : 0;
        setCooldownMs(clamped);
        if (clamped <= 0 && timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }, 1000);
    } catch {
      setErrors({ submit: "Koneksi gagal. Periksa internet Anda dan coba lagi." });
    } finally {
      setIsLoading(false);
    }
  }

  const isOnCooldown = cooldownMs > 0;
  const fieldDisabled = isOnCooldown && isSubmitted;

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-5">
        {/* Row 1: Name + WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Your Name"
              disabled={fieldDisabled}
              className="w-full bg-input border border-border rounded-xl px-5 py-3.5 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent/60 transition-colors duration-200 disabled:opacity-40"
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs text-red-400 pl-1"
                >
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="tel"
              value={wa}
              onChange={handleWaChange}
              placeholder="Your WhatsApp"
              disabled={fieldDisabled}
              className="w-full bg-input border border-border rounded-xl px-5 py-3.5 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent/60 transition-colors duration-200 disabled:opacity-40"
            />
            <AnimatePresence>
              {errors.wa && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs text-red-400 pl-1"
                >
                  {errors.wa}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Row 2: Concept */}
        <div className="flex flex-col gap-2">
          <textarea
            value={concept}
            onChange={(e) => setConcept(e.target.value.slice(0, 1000))}
            placeholder="Diskusikan video mu seperti apa di kolom ini, ceritakan mulai dari jenis video, durasi, lokasi, dan estimasi budget, kirim ke kami dan kami akan hubungimu secepatnya."
            rows={8}
            disabled={fieldDisabled}
            className="w-full bg-input border border-border rounded-xl px-5 py-4 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent/60 transition-colors duration-200 resize-none leading-relaxed disabled:opacity-40"
          />
          <p className="text-[11px] text-muted-foreground/40 text-right pr-1">
            {concept.length}/1000
          </p>
        </div>

        {/* Row 3: Button bottom-right */}
        <div className="flex flex-col items-end gap-3">
          <button
            type="submit"
            disabled={isLoading || fieldDisabled}
            className="px-8 py-3.5 rounded-xl bg-foreground text-background font-semibold text-xs uppercase tracking-widest hover:bg-foreground/85 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] text-center"
          >
            {isLoading
              ? "Mengirim..."
              : isSubmitted && isOnCooldown
              ? "Pesan Terkirim"
              : "Kirim Pesan"}
          </button>

          <AnimatePresence mode="wait">
            {errors.submit && (
              <motion.p
                key="submit-error"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-xs text-red-400 text-right"
              >
                {errors.submit}
              </motion.p>
            )}
            {isOnCooldown && (
              <motion.p
                key="cooldown-warning"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-xs text-right"
              >
                {isSubmitted ? (
                  <span className="text-accent">
                    Pesan berhasil dikirim — kami akan menghubungimu segera.{" "}
                    <span className="text-muted-foreground">
                      Dapat mengirim kembali dalam{" "}
                      <span className="font-mono font-semibold text-foreground">{formatTime(cooldownMs)}</span>.
                    </span>
                  </span>
                ) : (
                  <span className="text-red-400">
                    Anda sudah pernah melakukan submission. Silahkan tunggu{" "}
                    <span className="font-mono font-semibold">{formatTime(cooldownMs)}</span> lagi.
                  </span>
                )}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getRestaurant } from "@/lib/data";

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const r = getRestaurant();

  return (
    <section
      className="relative min-h-screen flex items-end overflow-hidden bg-black-olive"
      aria-label="Presentación del restaurante"
    >
      <Image
        src={r.hero.imageUrl}
        alt={r.hero.imageAlt}
        fill
        sizes="100vw"
        className="object-cover object-center"
        style={{ opacity: 0.35 }}
        preload
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, #1d0b0d 30%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 pb-24 pt-32 w-full">
        <motion.p
          custom={0}
          variants={FADE_UP}
          initial="hidden"
          animate="show"
          className="text-lemon-zest text-sm tracking-widest uppercase mb-6"
        >
          {r.tagline}
        </motion.p>

        <motion.h1
          custom={1}
          variants={FADE_UP}
          initial="hidden"
          animate="show"
          className="text-warm-cream font-medium leading-none tracking-[0.06em] uppercase"
          style={{ fontSize: "clamp(56px, 10vw, 120px)" }}
        >
          {r.name}
        </motion.h1>

        <motion.p
          custom={2}
          variants={FADE_UP}
          initial="hidden"
          animate="show"
          className="text-warm-cream/60 mt-6 max-w-md text-base leading-relaxed"
        >
          {r.description}
        </motion.p>

        <motion.div
          custom={3}
          variants={FADE_UP}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#reserva"
            className="bg-lemon-zest text-black-olive text-sm font-medium tracking-wide px-6 py-3 hover:opacity-90 transition-opacity"
            style={{ borderRadius: "1px" }}
          >
            Reservar mesa
          </a>
          <a
            href="#menu"
            className="border border-warm-cream/40 text-warm-cream text-sm tracking-wide px-6 py-3 hover:border-warm-cream transition-colors"
            style={{ borderRadius: "1px" }}
          >
            Ver la carta
          </a>
        </motion.div>
      </div>
    </section>
  );
}

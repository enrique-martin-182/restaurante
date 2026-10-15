"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { getMenu } from "@/lib/data";
import type { Dish } from "@/lib/types";

function DishCard({ dish }: { dish: Dish }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="relative aspect-square overflow-hidden w-full">
        <Image
          src={`${dish.imageUrl}?w=480&h=480&fit=crop&auto=format`}
          alt={dish.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-3">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-forest-ink text-sm font-medium tracking-wide leading-snug">
            {dish.name}
          </h3>
          <span className="text-forest-ink text-sm font-medium shrink-0">
            {dish.price} €
          </span>
        </div>
        <p className="text-forest-ink/60 text-xs leading-relaxed mt-1">
          {dish.description}
        </p>
      </div>
    </motion.article>
  );
}

export function Menu() {
  const { categories, dishes } = getMenu();
  const [active, setActive] = useState(categories[0].id);

  const filtered = dishes.filter((d) => d.category === active);

  return (
    <section
      id="menu"
      className="bg-warm-cream py-24 px-6"
      aria-label="Carta del restaurante"
    >
      <div className="max-w-screen-xl mx-auto">
        <p className="text-forest-ink/40 text-xs tracking-widest uppercase mb-3">
          Nuestra propuesta
        </p>
        <h2
          className="text-forest-ink font-medium tracking-[0.04em] uppercase mb-12"
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
        >
          La Carta
        </h2>

        <div
          role="tablist"
          aria-label="Categorías de la carta"
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={active === cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-5 py-2 text-xs tracking-widest uppercase transition-colors duration-200 ${
                active === cat.id
                  ? "bg-forest-ink text-warm-cream"
                  : "border border-forest-ink/30 text-forest-ink/60 hover:border-forest-ink hover:text-forest-ink"
              }`}
              style={{ borderRadius: "1px" }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            role="tabpanel"
          >
            {filtered.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

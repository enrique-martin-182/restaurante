"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getRestaurant } from "@/lib/data";
import type { GalleryItem } from "@/lib/types";

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black-olive/95"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-6 right-6 text-warm-cream/60 hover:text-warm-cream transition-colors text-3xl leading-none z-10"
      >
        ×
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Anterior"
        className="absolute left-4 md:left-8 text-warm-cream/60 hover:text-warm-cream transition-colors text-3xl z-10 p-2"
      >
        ‹
      </button>

      <div
        className="relative w-full max-w-3xl aspect-square mx-12 md:mx-24"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={`${item.imageUrl}?w=900&h=900&fit=crop&auto=format`}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 90vw, 700px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Siguiente"
        className="absolute right-4 md:right-8 text-warm-cream/60 hover:text-warm-cream transition-colors text-3xl z-10 p-2"
      >
        ›
      </button>

      <p className="absolute bottom-6 text-warm-cream/40 text-xs tracking-wide">
        {index + 1} / {items.length}
      </p>
    </motion.div>
  );
}

export function Gallery() {
  const { gallery } = getRestaurant();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIdx(null), []);
  const prev = useCallback(
    () => setLightboxIdx((i) => (i !== null ? (i - 1 + gallery.length) % gallery.length : 0)),
    [gallery.length]
  );
  const next = useCallback(
    () => setLightboxIdx((i) => (i !== null ? (i + 1) % gallery.length : 0)),
    [gallery.length]
  );

  return (
    <section
      id="galeria"
      className="bg-black-olive py-24 px-6"
      aria-label="Galería de imágenes"
    >
      <div className="max-w-screen-xl mx-auto">
        <p className="text-warm-cream/40 text-xs tracking-widest uppercase mb-3">
          El ambiente
        </p>
        <h2
          className="text-warm-cream font-medium tracking-[0.04em] uppercase mb-12"
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
        >
          Galería
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {gallery.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setLightboxIdx(idx)}
              className="relative aspect-square overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-lemon-zest"
              aria-label={`Ver imagen: ${item.alt}`}
            >
              <Image
                src={`${item.imageUrl}?w=480&h=480&fit=crop&auto=format`}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black-olive/0 group-hover:bg-black-olive/25 transition-colors duration-300" />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            items={gallery}
            index={lightboxIdx}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

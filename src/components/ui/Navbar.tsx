"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LEFT = [
  { href: "#menu", label: "Carta" },
  { href: "#reserva", label: "Reservar" },
];

const NAV_RIGHT = [
  { href: "#galeria", label: "Galería" },
  { href: "#horarios", label: "Horarios" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-black-olive/95 backdrop-blur-sm" : "bg-transparent"
      }`}
      style={{ height: "80px" }}
    >
      <nav
        className="h-full max-w-screen-xl mx-auto px-6 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_LEFT.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-warm-cream/70 hover:text-warm-cream text-sm tracking-widest uppercase transition-colors duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="text-warm-cream font-medium tracking-[0.04em] select-none"
          style={{ fontSize: "46px", lineHeight: 1 }}
          aria-label="Limón — inicio"
        >
          LIMÓN
        </Link>

        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_RIGHT.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-warm-cream/70 hover:text-warm-cream text-sm tracking-widest uppercase transition-colors duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-warm-cream p-2 -mr-2"
          aria-label="Menú de navegación"
        >
          <svg
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="0" y1="1" x2="22" y2="1" />
            <line x1="0" y1="8" x2="22" y2="8" />
            <line x1="0" y1="15" x2="22" y2="15" />
          </svg>
        </button>
      </nav>
    </header>
  );
}

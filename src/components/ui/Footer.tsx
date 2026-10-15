"use client";

import Link from "next/link";
import { getRestaurant } from "@/lib/data";

const YEAR = 2026;

export function Footer() {
  const r = getRestaurant();

  return (
    <footer className="bg-black-olive border-t border-sage-mist/20">
      <div className="max-w-screen-xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p
            className="text-warm-cream font-medium tracking-[0.04em] mb-4"
            style={{ fontSize: "32px", lineHeight: 1 }}
          >
            LIMÓN
          </p>
          <p className="text-warm-cream/50 text-sm leading-relaxed">
            {r.tagline}
          </p>
        </div>

        <div>
          <h3 className="text-warm-cream/40 text-xs tracking-widest uppercase mb-4">
            Visítanos
          </h3>
          <address className="not-italic space-y-2 text-warm-cream/70 text-sm">
            <p>{r.address}</p>
            <p>
              <a
                href={`tel:${r.phone.replace(/\s/g, "")}`}
                className="hover:text-warm-cream transition-colors"
              >
                {r.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${r.email}`}
                className="hover:text-warm-cream transition-colors"
              >
                {r.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <h3 className="text-warm-cream/40 text-xs tracking-widest uppercase mb-4">
            Síguenos
          </h3>
          <div className="flex gap-4">
            <Link
              href={r.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-cream/50 hover:text-lemon-zest transition-colors text-sm tracking-wide"
            >
              Instagram
            </Link>
            <Link
              href={r.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-cream/50 hover:text-lemon-zest transition-colors text-sm tracking-wide"
            >
              Facebook
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-sage-mist/10 px-6 py-6 max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-warm-cream/30 text-xs">
          © {YEAR} Limón Brasserie. Todos los derechos reservados.
        </p>
        <p className="text-warm-cream/20 text-xs italic">
          Demo portfolio — no es un restaurante real
        </p>
      </div>
    </footer>
  );
}

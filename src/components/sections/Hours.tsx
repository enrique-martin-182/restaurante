"use client";

import { getRestaurant } from "@/lib/data";

export function Hours() {
  const r = getRestaurant();

  return (
    <section
      id="horarios"
      className="bg-warm-cream py-24 px-6"
      aria-label="Horarios y contacto"
    >
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-forest-ink/40 text-xs tracking-widest uppercase mb-3">
            Cuándo vernos
          </p>
          <h2
            className="text-forest-ink font-medium tracking-[0.04em] uppercase leading-none mb-10"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Horarios
          </h2>

          <table className="w-full text-sm" aria-label="Horario de apertura">
            <tbody>
              {r.hours.map((row) => (
                  <tr
                    key={row.days}
                    className="border-b border-forest-ink/10 last:border-0"
                  >
                    <td className="py-4 pr-8 text-forest-ink font-medium">
                      {row.days}
                    </td>
                    <td
                      className={`py-4 text-right ${
                        row.time === "Cerrado"
                          ? "text-forest-ink/40"
                          : "text-forest-ink/70"
                      }`}
                    >
                      {row.time}
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-8">
          <div>
            <p className="text-forest-ink/40 text-xs tracking-widest uppercase mb-3">
              Dónde estamos
            </p>
            <address className="not-italic space-y-2">
              <p className="text-forest-ink text-lg font-medium">{r.address}</p>
              <p>
                <a
                  href={`tel:${r.phone.replace(/\s/g, "")}`}
                  className="text-forest-ink/70 hover:text-forest-ink transition-colors"
                >
                  {r.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${r.email}`}
                  className="text-forest-ink/70 hover:text-forest-ink transition-colors"
                >
                  {r.email}
                </a>
              </p>
            </address>
          </div>

          <div
            className="bg-sage-mist/30 w-full flex items-center justify-center"
            style={{ height: "280px" }}
            aria-label="Mapa de ubicación (demo)"
          >
            <p className="text-forest-ink/40 text-sm tracking-wide">
              Mapa — Google Maps
            </p>
          </div>

          <a
            href="#reserva"
            className="inline-block bg-lemon-zest text-black-olive text-sm font-medium tracking-wide px-6 py-3 hover:opacity-90 transition-opacity"
            style={{ borderRadius: "1px" }}
          >
            Reservar mesa
          </a>
        </div>
      </div>
    </section>
  );
}

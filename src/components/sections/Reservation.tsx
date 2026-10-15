"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservationSchema, type ReservationInput } from "@/lib/schemas";

const TIME_SLOTS = [
  "14:00", "14:30", "15:00", "15:30", "16:00",
  "21:00", "21:30", "22:00", "22:30", "23:00",
];

type FormState = "idle" | "loading" | "success" | "error";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-400">{message}</p>;
}

const inputClass =
  "w-full bg-transparent border border-warm-cream/20 text-warm-cream px-4 py-3 text-sm placeholder:text-warm-cream/30 focus:outline-none focus:border-lemon-zest transition-colors";

export function Reservation() {
  const [state, setState] = useState<FormState>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationInput>({
    resolver: zodResolver(reservationSchema),
  });


  async function onSubmit(data: ReservationInput) {
    setState("loading");
    try {
      const res = await fetch("/api/reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setState("success");
        reset();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <section
      id="reserva"
      className="bg-black-olive py-24 px-6"
      aria-label="Formulario de reserva"
    >
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-lemon-zest text-xs tracking-widest uppercase mb-3">
            Mesa para esta noche
          </p>
          <h2
            className="text-warm-cream font-medium tracking-[0.04em] uppercase leading-none"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Reservar
          </h2>
          <p className="text-warm-cream/50 mt-6 max-w-sm text-sm leading-relaxed">
            Confirmamos tu reserva por email en menos de 24 horas. Para grupos
            de más de 12 personas, contáctanos directamente.
          </p>
        </div>

        <div>
          {state === "success" ? (
            <div className="border border-lemon-zest/30 p-8 text-center">
              <p className="text-lemon-zest text-lg font-medium mb-2">
                ¡Reserva recibida!
              </p>
              <p className="text-warm-cream/60 text-sm">
                Te confirmaremos por email en breve.
              </p>
              <button
                onClick={() => setState("idle")}
                className="mt-6 text-warm-cream/50 text-xs tracking-wide hover:text-warm-cream transition-colors underline underline-offset-2"
              >
                Hacer otra reserva
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <input
                    {...register("name")}
                    placeholder="Nombre completo"
                    className={inputClass}
                    style={{ borderRadius: "1px" }}
                    autoComplete="name"
                  />
                  <FieldError message={errors.name?.message} />
                </div>
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className={inputClass}
                    style={{ borderRadius: "1px" }}
                    autoComplete="email"
                  />
                  <FieldError message={errors.email?.message} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="Teléfono"
                    className={inputClass}
                    style={{ borderRadius: "1px" }}
                    autoComplete="tel"
                  />
                  <FieldError message={errors.phone?.message} />
                </div>
                <div>
                  <input
                    {...register("guests", { valueAsNumber: true })}
                    type="number"
                    min={1}
                    max={12}
                    placeholder="Personas (1–12)"
                    className={inputClass}
                    style={{ borderRadius: "1px" }}
                  />
                  <FieldError message={errors.guests?.message} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <input
                    {...register("date")}
                    type="date"
                    className={`${inputClass} [color-scheme:dark]`}
                    style={{ borderRadius: "1px" }}
                  />
                  <FieldError message={errors.date?.message} />
                </div>
                <div>
                  <select
                    {...register("time")}
                    className={`${inputClass} cursor-pointer`}
                    style={{ borderRadius: "1px" }}
                  >
                    <option value="" className="bg-black-olive">
                      Hora
                    </option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t} className="bg-black-olive">
                        {t}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors.time?.message} />
                </div>
              </div>

              <div>
                <textarea
                  {...register("notes")}
                  rows={3}
                  placeholder="Alergias, ocasiones especiales u otras notas (opcional)"
                  className={`${inputClass} resize-none`}
                  style={{ borderRadius: "1px" }}
                />
                <FieldError message={errors.notes?.message} />
              </div>

              {state === "error" && (
                <p className="text-red-400 text-xs">
                  Error al enviar. Inténtalo de nuevo o llámanos.
                </p>
              )}

              <button
                type="submit"
                disabled={state === "loading"}
                className="w-full bg-lemon-zest text-black-olive text-sm font-medium tracking-wide py-3 px-6 hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ borderRadius: "1px" }}
              >
                {state === "loading" ? "Enviando…" : "Confirmar reserva"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

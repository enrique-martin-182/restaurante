import { NextResponse } from "next/server";
import { reservationSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = reservationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const data = parsed.data;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (new Date(data.date) < today) {
    return NextResponse.json({ error: "Date must be today or later" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const ownerEmail = process.env.OWNER_EMAIL ?? "reservas@limon-madrid.es";

    await resend.emails.send({
      from: "Limón Reservas <onboarding@resend.dev>",
      to: ownerEmail,
      subject: `Nueva reserva — ${data.name} · ${data.date} ${data.time}`,
      text: [
        `Nombre: ${data.name}`,
        `Email: ${data.email}`,
        `Teléfono: ${data.phone}`,
        `Fecha: ${data.date}`,
        `Hora: ${data.time}`,
        `Personas: ${data.guests}`,
        data.notes ? `Notas: ${data.notes}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

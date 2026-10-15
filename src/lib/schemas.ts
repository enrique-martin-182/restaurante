import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email no válido"),
  phone: z
    .string()
    .regex(/^[+\d\s\-()]{9,15}$/, "Teléfono no válido"),
  date: z.string().min(1, "Selecciona una fecha"),
  time: z.enum(["14:00", "14:30", "15:00", "15:30", "16:00", "21:00", "21:30", "22:00", "22:30", "23:00"], {
    errorMap: () => ({ message: "Hora no válida" }),
  }),
  guests: z.number().min(1, "Mínimo 1 persona").max(12, "Máximo 12 personas"),
  notes: z.string().max(500, "Máximo 500 caracteres").optional(),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

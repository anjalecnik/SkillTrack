import { z } from "zod";
import { ReservationTimePeriod } from "~/types";

export const reservationFormSchema = z.object({
  intent: z.literal("create"),
  deskId: z.string(),
  fromDateStart: z.string(),
  toDateEnd: z.string().optional(),
  weeklyPlan: z.string().optional(),
  timePeriod: z.nativeEnum(ReservationTimePeriod),
});

export type ReservationFormSchema = z.infer<typeof reservationFormSchema>;

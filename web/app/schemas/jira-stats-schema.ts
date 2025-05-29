import { z } from "zod";

export const jiraStatsSchema = z.object({
  ticketId: z.string().min(1, "Ticket ID is required"),
});

import { z } from "zod";

/** Potato status schema */
export const potatoSchema = z.object({
  online: z.boolean(),
  since: z.number().int(),
  lastCheck: z.number().int(),
});

export type PotatoStatus = z.infer<typeof potatoSchema>;
import { z } from "zod";

export const profile = z.object({
  firstName: z.string(),
  lastName: z.string(),
  photoURL: z.string().url(),
  email: z.string().email(),
});

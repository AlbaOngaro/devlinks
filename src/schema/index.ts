import { link } from "schema/link";
import { profile } from "schema/profile";
import { z } from "zod";

export const schema = z.object({
  profile,
  links: z.array(link),
});

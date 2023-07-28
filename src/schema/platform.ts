import { z } from "zod";

export const platform = z.enum([
  "github",
  "frontend-mentor",
  "twitter",
  "linkedin",
  "youtube",
  "facebook",
  "twitch",
  "devto",
  "codewars",
  "codepen",
  "freecodecamp",
  "gitlab",
  "hashnode",
  "stack-overflow",
]);

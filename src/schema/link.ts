import { Validator } from "types";
import { z } from "zod";

import { platform } from "./platform";

export const validator: Validator = {
  github: /^https:\/\/(?:www\.)?github.com\/.*/,
  "frontend-mentor": /^https:\/\/(?:www\.)?.frontendmentor.io\/profile\/.*/,
  twitter: /^https:\/\/(?:www\.)?twitter.com\/.*/,
  linkedin: /^https:\/\/(?:www\.)?linkedin.com\.*/,
  youtube: /^https:\/\/(?:www\.)?youtube.com\/.*/,
  facebook: /^https:\/\/(?:www\.)?facebook.com\/.*/,
  twitch: /^https:\/\/(?:www\.)?twitch.com\/.*/,
  devto: /^https:\/\/(?:www\.)?dev.to\/.*/,
  codewars: /^https:\/\/(?:www\.)?codewars.com\/users\/.*/,
  codepen: /^https:\/\/(?:www\.)?codepen.io\/.*/,
  freecodecamp: /^https:\/\/(?:www\.)?freecodecamp.org\/.*/,
  gitlab: /^https:\/\/(?:www\.)?gitlab.com\/.*/,
  hashnode: /https:\/\/(?:www\.)?hashnode.com\/.*/,
  "stack-overflow": /https:\/\/(?:www\.)?stackoverflow.com\/users\/.*/,
};

export const link = z
  .object({
    id: z.string().uuid(),
    type: platform,
    label: z.string(),
    url: z.string().url(),
    order: z.number(),
  })
  .refine((schema) => validator[schema.type].test(schema.url));

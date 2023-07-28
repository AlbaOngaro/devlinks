import { link } from "schema/link";
import { platform } from "schema/platform";
import { profile } from "schema/profile";
import { z } from "zod";

export type Platform = z.infer<typeof platform>;

export type Link = z.infer<typeof link>;

export type Validator = Record<Platform, RegExp>;

export type Profile = z.infer<typeof profile>;

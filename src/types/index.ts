export type Platform =
  | "github"
  | "frontend-mentor"
  | "twitter"
  | "linkedin"
  | "youtube"
  | "facebook"
  | "twitch"
  | "devto"
  | "codewars"
  | "codepen"
  | "freecodecamp"
  | "gitlab"
  | "hashnode"
  | "stack-overflow";

export interface Link {
  id: string | number;
  type: Platform;
  label: string;
  url: string;
}
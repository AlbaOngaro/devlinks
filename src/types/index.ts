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
  id: string;
  type: Platform;
  label: string;
  url: string;
  order: number;
}

export interface Profile {
  firstName: string;
  lastName: string;
  photoURL: string;
  email: string;
}

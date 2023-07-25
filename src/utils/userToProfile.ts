import { User } from "@supabase/supabase-js";
import { Profile } from "types";

export function userToProfile(user: User): Profile {
  return {
    firstName: user.user_metadata.firstName,
    lastName: user.user_metadata.lastName,
    photoURL: user.user_metadata.photoURL,
    email: user.email || "",
  };
}

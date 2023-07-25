import { AuthError } from "@supabase/supabase-js";
import useSWR from "swr";
import { Profile } from "types";

import { supabase } from "lib/supabase";

export function useGetProfile() {
  return useSWR<Profile, AuthError, "/api/profile">(
    "/api/profile",
    async () => {
      const {
        error,
        data: { user },
      } = await supabase.auth.getUser();

      if (error || !user) {
        throw error;
      }

      return {
        firstName: user.user_metadata.firstName,
        lastName: user.user_metadata.lastName,
        photoURL: user.user_metadata.photoURL,
        email: user.email || "",
      };
    },
  );
}

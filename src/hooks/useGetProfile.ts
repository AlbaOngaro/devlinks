import { AuthError, User } from "@supabase/supabase-js";
import { supabase } from "lib/supabase";
import useSWR from "swr";

export function useGetProfile() {
  return useSWR<User, AuthError, "profile">(
    "profile",
    async () => {
      const { error, data } = await supabase.auth.getUser();

      if (error) {
        throw error;
      }

      return data.user;
    },
    {
      revalidateOnMount: true,
    },
  );
}

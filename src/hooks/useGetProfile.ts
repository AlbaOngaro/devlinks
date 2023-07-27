import { AuthError } from "@supabase/supabase-js";
import { ProfileService } from "services/profile";
import useSWR from "swr";
import { Profile } from "types";

export function useGetProfile() {
  return useSWR<Profile, AuthError, "/api/profile">("/api/profile", () =>
    ProfileService.read(),
  );
}

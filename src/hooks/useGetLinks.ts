import useSWR from "swr";
import { Link } from "types";

import { supabase } from "lib/supabase";

export function useGetLinks() {
  return useSWR<Link[], unknown, "/api/links">("/api/links", async () => {
    console.debug("useGetLinks");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return [];
    }

    return supabase
      .from("links")
      .select<"", Link>()
      .eq("uid", user.id)
      .then((res) => res.data || []);
  });
}

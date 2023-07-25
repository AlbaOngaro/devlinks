import { supabase } from "lib/supabase";
import useSWR from "swr";
import { Link } from "types";

export function useGetLinks() {
  return useSWR<Link[], unknown, "links">("links", async () => {
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
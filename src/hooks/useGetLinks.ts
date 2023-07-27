import { LinksService } from "services/links";
import useSWR from "swr";
import { Link } from "types";

export function useGetLinks() {
  return useSWR<Link & { uid: string }[], unknown, "/api/links">(
    "/api/links",
    () => LinksService.read(),
  );
}

import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import { Link } from "types";
import { DefaultLayout } from "layouts/default/DefaultLayout";

import { LinksCard } from "./components/links-card/LinksCard";
import { PreviewCard } from "./components/preview-card/PreviewCard";

interface LinksContextValue {
  links: Link[];
  setLinks: Dispatch<SetStateAction<Link[]>>;
}

const LinksContext = createContext<LinksContextValue>({
  links: [],
  setLinks: () => {},
});

export function useLinksContext() {
  return useContext(LinksContext);
}

export function HomePage() {
  const [links, setLinks] = useState<Link[]>([]);

  return (
    <LinksContext.Provider value={{ links, setLinks }}>
      <PreviewCard />
      <LinksCard />
    </LinksContext.Provider>
  );
}

HomePage.getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

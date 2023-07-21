import { ReactElement } from "react";

import { DefaultLayout } from "layouts/default/DefaultLayout";

import { LinksCard } from "./components/links-card/LinksCard";
import { PreviewCard } from "./components/preview-card/PreviewCard";

export function HomePage() {
  return (
    <>
      <PreviewCard />
      <LinksCard />
    </>
  );
}

HomePage.getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

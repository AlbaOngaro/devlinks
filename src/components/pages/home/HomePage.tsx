import { ReactElement } from "react";

import { DefaultLayout } from "layouts/default/DefaultLayout";

import { LinksForm } from "./components/links-form/LinksForm";
import { PreviewCard } from "./components/preview-card/PreviewCard";

export function HomePage() {
  return (
    <>
      <PreviewCard />
      <LinksForm />
    </>
  );
}

HomePage.getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

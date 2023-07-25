import { CurrentTabProvider } from "providers/current-tab/CurrentTabProvider";
import { PropsWithChildren } from "react";

import { Header } from "components/header/Header";

import * as styles from "./DefaultLayout.styles";

export function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <CurrentTabProvider>
      <section css={styles.container}>
        <Header />
        {children}
      </section>
    </CurrentTabProvider>
  );
}

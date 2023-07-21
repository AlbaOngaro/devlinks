import { Header } from "components/Header/Header";
import { PropsWithChildren } from "react";

import * as styles from "./DefaultLayout.styles";

export function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <section css={styles.container}>
      <Header />
      {children}
    </section>
  );
}

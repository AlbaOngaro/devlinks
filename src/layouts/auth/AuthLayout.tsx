import Image from "next/image";
import { PropsWithChildren } from "react";

import { Card } from "components/card/Card";

import * as styles from "./AuthLayout.styles";

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <section css={styles.container}>
      <Image
        width={182}
        height={40}
        src="/images/logo-devlinks-large.svg"
        alt="logo"
      />
      <Card css={styles.card}>{children}</Card>
    </section>
  );
}

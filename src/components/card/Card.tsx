import { PropsWithChildren } from "react";

import * as styles from "./Card.styles";

interface Props extends PropsWithChildren {
  className?: string;
}

export function Card({ children, className }: Props) {
  return (
    <article css={styles.card} className={className}>
      {children}
    </article>
  );
}

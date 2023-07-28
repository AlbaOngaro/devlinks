import { PropsWithChildren } from "react";

import * as styles from "./Header.styles";

interface Props extends PropsWithChildren {
  className?: string;
}

export function Header({ children, className }: Props) {
  return (
    <header css={styles.header} className={className}>
      {children}
    </header>
  );
}

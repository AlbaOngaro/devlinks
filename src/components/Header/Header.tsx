import Image from "next/image";
import { Button } from "components/Button/Button";

import * as styles from "./Header.styles";

export function Header() {
  return (
    <header css={styles.header}>
      <Image
        src="/images/logo-devlinks-large.svg"
        height={32}
        width={146}
        alt="logo"
      />

      <Button css={styles.preview} variant="secondary">
        Preview
      </Button>
    </header>
  );
}

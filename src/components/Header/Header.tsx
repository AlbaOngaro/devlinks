import Image from "next/image";
import { Button } from "components/Button/Button";

import * as styles from "./Header.styles";
import { supabase } from "lib/supabase";
import { Link1Icon, PersonIcon } from "@radix-ui/react-icons";
import {
  Tab,
  useCurrentTabContext,
} from "providers/current-tab/CurrentTabProvider";

export function Header() {
  const { current, setCurrent } = useCurrentTabContext();

  return (
    <header css={styles.header}>
      <Image
        src="/images/logo-devlinks-large.svg"
        height={32}
        width={146}
        alt="logo"
      />

      <div css={styles.tabButtons}>
        <button
          onClick={() => setCurrent(Tab.Links)}
          css={(theme) => styles.tabButton(theme, current === Tab.Links)}
        >
          <Link1Icon />
          Links
        </button>
        <button
          onClick={() => setCurrent(Tab.Profile)}
          css={(theme) => styles.tabButton(theme, current === Tab.Profile)}
        >
          <PersonIcon />
          Profile Details
        </button>
      </div>

      <Button
        css={styles.preview}
        variant="secondary"
        onClick={() => supabase.auth.signOut()}
      >
        Preview
      </Button>
    </header>
  );
}

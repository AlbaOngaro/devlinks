import { Link1Icon, PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  CurrentTabProvider,
  Tab,
  useCurrentTabContext,
} from "providers/current-tab/CurrentTabProvider";
import { PropsWithChildren } from "react";

import { Button } from "components/button/Button";
import { Header } from "components/header/Header";

import * as styles from "./DefaultLayout.styles";

function LinksButton() {
  const { current, setCurrent } = useCurrentTabContext();
  return (
    <button
      onClick={() => setCurrent(Tab.Links)}
      css={(theme) => styles.tabButton(theme, current === Tab.Links)}
    >
      <Link1Icon />
      Links
    </button>
  );
}

function ProfileButton() {
  const { current, setCurrent } = useCurrentTabContext();
  return (
    <button
      onClick={() => setCurrent(Tab.Profile)}
      css={(theme) => styles.tabButton(theme, current === Tab.Profile)}
    >
      <PersonIcon />
      Profile Details
    </button>
  );
}

export function DefaultLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <CurrentTabProvider>
      <section css={styles.container}>
        <Header>
          <Image
            src="/images/logo-devlinks-large.svg"
            height={32}
            width={146}
            alt="logo"
          />

          <div css={styles.tabButtons}>
            <LinksButton />
            <ProfileButton />
          </div>

          <Button
            css={styles.preview}
            variant="secondary"
            onClick={() => router.push("/preview")}
          >
            Preview
          </Button>
        </Header>
        {children}
      </section>
    </CurrentTabProvider>
  );
}

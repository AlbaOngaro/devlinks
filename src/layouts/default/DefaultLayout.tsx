import { useTheme } from "@emotion/react";
import { EyeOpenIcon, Link1Icon, PersonIcon } from "@radix-ui/react-icons";
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
  const theme = useTheme();
  const router = useRouter();

  return (
    <CurrentTabProvider>
      <section css={styles.container}>
        <Header>
          <picture css={styles.logo}>
            <source
              media={`(${theme.media.md})`}
              srcSet="/images/logo-devlinks-large.svg"
            />

            <Image src="/images/logo-devlinks-small.svg" alt="logo" fill />
          </picture>

          <div css={styles.tabButtons}>
            <LinksButton />
            <ProfileButton />
          </div>

          <Button
            css={styles.preview}
            variant="secondary"
            onClick={() => router.push("/preview")}
          >
            <EyeOpenIcon /> Preview
          </Button>
        </Header>
        {children}
      </section>
    </CurrentTabProvider>
  );
}

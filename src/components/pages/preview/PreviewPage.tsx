import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import { Link, Profile } from "types";
import { userToProfile } from "utils/userToProfile";

import { Button } from "components/button/Button";
import { Card } from "components/card/Card";
import { Header } from "components/header/Header";
import { ProfileContents } from "components/profile-contents/ProfileContents";
import { supabase } from "lib/supabase";

import * as styles from "./PreviewPage.styles";

interface Props {
  links: Link[];
  profile: Profile;
}

export function PreviewPage({ links, profile }: Props) {
  const router = useRouter();

  return (
    <section css={styles.container}>
      <Header>
        <Button
          css={styles.button}
          onClick={() => router.push("/")}
          variant="secondary"
        >
          Back to Editor
        </Button>
        <Button
          css={styles.button}
          variant="primary"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              console.log("Content copied to clipboard");
            } catch (err) {
              console.error("Failed to copy: ", err);
            }
          }}
        >
          Share Link
        </Button>
      </Header>

      <Card css={styles.card}>
        <ProfileContents links={links} profile={profile} />
      </Card>
    </section>
  );
}

export async function getServerSideProps({
  req,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  const refreshToken = req.cookies["dl-refresh-token"];
  const accessToken = req.cookies["dl-access-token"];

  if (!refreshToken || !accessToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  await supabase.auth.setSession({
    refresh_token: refreshToken,
    access_token: accessToken,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const { data: links = [] } = await supabase
    .from("links")
    .select<"links", Link>()
    .eq("uid", user.id);

  return {
    props: {
      links: links || [],
      profile: userToProfile(user),
    },
  };
}

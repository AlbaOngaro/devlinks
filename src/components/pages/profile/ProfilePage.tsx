import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { Link, Profile } from "types";
import { userToProfile } from "utils/userToProfile";

import { Card } from "components/card/Card";
import { ProfileContents } from "components/profile-contents/ProfileContents";
import { supabase } from "lib/supabase";

import * as styles from "./ProfilePage.styles";

interface Props {
  profile: Profile;
  links: Link[];
}

export function ProfilePage({ profile, links }: Props) {
  return (
    <section css={styles.container}>
      <Card css={styles.card}>
        <ProfileContents links={links} profile={profile} />
      </Card>
    </section>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const {
    data: { users = [] },
  } = await supabase.auth.admin.listUsers({
    perPage: 10,
  });

  return {
    paths: users.map((user) => ({
      params: {
        id: user.id,
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> {
  const id = params?.id as string;

  const [links, user] = await Promise.all([
    supabase
      .from("links")
      .select<"links", Link>()
      .eq("uid", id)
      .then((res) => res.data),
    supabase.auth.admin.getUserById(id).then((res) => res.data.user),
  ]);

  if (!links || !user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      links,
      profile: userToProfile(user),
    },
  };
}

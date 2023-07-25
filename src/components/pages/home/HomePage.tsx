import { DefaultLayout } from "layouts/default/DefaultLayout";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {
  Tab,
  useCurrentTabContext,
} from "providers/current-tab/CurrentTabProvider";
import { ReactElement } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { SWRConfig } from "swr";
import { Link, Profile } from "types";
import { userToProfile } from "utils/userToProfile";

import { ProfileCard } from "components/pages/home/components/profile-card/ProfileCard";
import { supabase } from "lib/supabase";

import { LinksCard } from "./components/links-card/LinksCard";
import { PreviewCard } from "./components/preview-card/PreviewCard";

interface EditFormValue {
  links: Link[];
  profile: Profile;
}

export function useEditForm() {
  return useFormContext<EditFormValue>();
}

export function HomePage({ links, profile }: EditFormValue) {
  console.debug(links, profile);

  const { current } = useCurrentTabContext();

  const methods = useForm<EditFormValue>({
    defaultValues: {
      links,
      profile,
    },
  });

  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/links": links,
          "/api/profile": profile,
        },
      }}
    >
      <FormProvider {...methods}>
        <PreviewCard />
        {(() => {
          switch (current) {
            case Tab.Links:
              return <LinksCard />;
            case Tab.Profile:
              return <ProfileCard />;
            default:
              return null;
          }
        })()}
      </FormProvider>
    </SWRConfig>
  );
}

HomePage.getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export async function getServerSideProps({
  req,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<EditFormValue>
> {
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

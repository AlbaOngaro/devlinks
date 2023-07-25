import { ReactElement } from "react";
import { SWRConfig } from "swr";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import { Link } from "types";
import { DefaultLayout } from "layouts/default/DefaultLayout";

import { LinksCard } from "./components/links-card/LinksCard";
import { PreviewCard } from "./components/preview-card/PreviewCard";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { supabase } from "lib/supabase";
import {
  Tab,
  useCurrentTabContext,
} from "providers/current-tab/CurrentTabProvider";
import { ProfileCard } from "components/pages/home/components/profile-card/ProfileCard";

interface Props {
  links: Link[];
}

export function useLinksForm() {
  return useFormContext<{ links: Link[] }>();
}

export function HomePage({ links }: Props) {
  const { current } = useCurrentTabContext();

  const methods = useForm<{ links: Link[] }>({
    defaultValues: {
      links,
    },
  });

  return (
    <SWRConfig
      value={{
        revalidateOnMount: false,
        revalidateOnFocus: false,
        fallback: {
          links,
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

  const user = await supabase.auth.getUser();

  if (user.error || !user.data) {
    console.error(user.error);

    return {
      notFound: true,
    };
  }

  const links = await supabase
    .from("links")
    .select<"links", Link>()
    .eq("uid", user.data.user.id);

  if (links.error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      links: links.data,
    },
  };
}

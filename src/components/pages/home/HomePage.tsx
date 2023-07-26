import { DiscIcon } from "@radix-ui/react-icons";
import { AnimatePresence } from "framer-motion";
import { DefaultLayout } from "layouts/default/DefaultLayout";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {
  Tab,
  useCurrentTabContext,
} from "providers/current-tab/CurrentTabProvider";
import { ReactElement, useState } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { SWRConfig } from "swr";
import { Link, Profile } from "types";
import { userToProfile } from "utils/userToProfile";
import { v4 } from "uuid";

import { ProfileCard } from "components/pages/home/components/profile-card/ProfileCard";
import { Toast } from "components/toast/Toast";
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
  const [notifications, setNotifications] = useState<string[]>([]);

  const { current } = useCurrentTabContext();

  const { formState, handleSubmit, reset, ...methods } = useForm<EditFormValue>(
    {
      defaultValues: {
        links,
        profile,
      },
    },
  );

  const handleSubmitWrapper = (
    onSuccess: SubmitHandler<EditFormValue>,
    onError?: SubmitErrorHandler<EditFormValue>,
  ) => {
    return handleSubmit(async (data) => {
      setNotifications((curr) => [...curr, v4()]);
      await onSuccess(data);
      reset(data);
    }, onError);
  };

  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/links": links,
          "/api/profile": profile,
        },
      }}
    >
      <FormProvider
        {...methods}
        formState={formState}
        handleSubmit={handleSubmitWrapper}
        reset={reset}
      >
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
        <AnimatePresence>
          {notifications.map((id) => (
            <Toast
              key={id}
              forceMount
              duration={2000}
              onOpenChange={() =>
                setNotifications((curr) => curr.filter((i) => i !== id))
              }
              title={
                <>
                  <DiscIcon />
                  Your changes have been successfully saved!
                </>
              }
            />
          ))}
        </AnimatePresence>
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

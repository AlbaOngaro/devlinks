import { Global, ThemeProvider } from "@emotion/react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import nookies from "nookies";
import { ReactElement, ReactNode, useEffect } from "react";
import { globalStyles } from "styles/global.styles";
import { theme } from "styles/theme";
import { SWRConfig } from "swr";

import { supabase } from "lib/supabase";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_IN": {
          if (session) {
            const maxAge = 60 * 60;
            nookies.set(undefined, "dl-access-token", session.access_token, {
              maxAge,
            });
            nookies.set(undefined, "dl-refresh-token", session.refresh_token, {
              maxAge,
            });
            break;
          }

          break;
        }
        case "TOKEN_REFRESHED": {
          if (session) {
            const maxAge = 60 * 60;
            nookies.set(undefined, "dl-access-token", session.access_token, {
              maxAge,
            });
            nookies.set(undefined, "dl-refresh-token", session.refresh_token, {
              maxAge,
            });
          }
          break;
        }
        case "SIGNED_OUT": {
          nookies.destroy(undefined, "dl-access-token");
          nookies.destroy(undefined, "dl-refresh-token");
          router.push("/login");
          break;
        }
        default:
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        refreshWhenHidden: false,
        refreshWhenOffline: false,
        revalidateOnReconnect: false,
      }}
    >
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </SWRConfig>
  );
}

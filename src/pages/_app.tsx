import { Global, ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import { NextPage } from "next";
import nookies from "nookies";

import { supabase } from "lib/supabase";
import { theme } from "styles/theme";
import { globalStyles } from "styles/global.styles";
import { useRouter } from "next/router";

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
    supabase.auth.onAuthStateChange((event, session) => {
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
            return router.reload();
          }
        }
        case "SIGNED_OUT": {
          nookies.destroy(undefined, "dl-access-token");
          nookies.destroy(undefined, "dl-refresh-token");
          return router.reload();
        }
        default:
          return;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

import { globalStyles } from "styles/global.styles";
import { Global, ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { theme } from "styles/theme";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

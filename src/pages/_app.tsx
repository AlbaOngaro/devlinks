import { globalStyles } from "styles/global.styles";
import { Global, ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { theme } from "styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

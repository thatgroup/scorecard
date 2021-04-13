// Libraries
import { css, Global, ThemeProvider } from "@emotion/react";

// Next.JS
import type { AppProps } from "next/app";
import Head from "next/head";

// Theme
import { getTheme } from "../shared/theme";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const theme = getTheme();

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: proxima-nova, serif;
            background: ${theme.colours.background};
            transition: background linear 1s;
            color: ${theme.colours.foreground};
            position: relative;
            min-height: 100vh;
            background-position: bottom;
          }

          a {
            color: inherit;
          }

          * {
            box-sizing: border-box;
          }
        `}
      />
      <Head>
        <title>Glow Golf</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Glow Golf Scorecard" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://use.typekit.net/cia7xbp.css" />
      </Head>
      <ThemeProvider theme={getTheme()}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

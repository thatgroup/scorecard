// Libraries
import { css, Global } from "@emotion/react";

// Next.JS
import type { AppProps } from "next/app";
import Head from "next/head";

// Shared
import { background } from "../shared/colours";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: proxima-nova, serif;
            background: ${background};
            transition: background linear 1s;
            color: white;
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
      <Component {...pageProps} />
    </>
  );
}

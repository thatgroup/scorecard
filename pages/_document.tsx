import type { DocumentContext, DocumentInitialProps } from "next/document";
import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/cia7xbp.css" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color="#00202c"
          />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#00202c" />
          <meta
            name="msapplication-config"
            content="/favicon/browserconfig.xml"
          />
          <meta name="theme-color" content="#00202c" />
          <link
            rel="preload"
            href="https://use.typekit.net/cia7xbp.css"
            as="style"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

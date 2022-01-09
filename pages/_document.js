import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import SiteConfig from "../lib/config";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"></meta>
          <meta name="description" content={`${SiteConfig.desc}`}></meta>

          <meta property="og:url" content="https://danielfrg.wordle.com"></meta>
          <meta property="og:type" content="website"></meta>
          <meta property="og:title" content={`${SiteConfig.title}`}></meta>
          <meta property="og:description" content={`${SiteConfig.desc}`}></meta>
          <meta
            property="og:image"
            content="https://danielfrg.wordle.com/images/wordle_og_1200x630.png"
          ></meta>

          <meta name="twitter:card" content="summary_large_image"></meta>
          <meta property="twitter:domain" content="danielfrg.wordle.com"></meta>

          <meta name="theme-color" content="#6aaa64"></meta>
          <link rel="manifest" href="manifest.json" />
          <link
            href="/images/wordle_logo_32x32.png"
            rel="icon shortcut"
            sizes="3232"
          />
          <link href="/images/wordle_logo_192x192.png" rel="apple-touch-icon" />
          <link
            rel="icon"
            type="image/x-icon"
            href="/images/wordle_logo_32x32.png"
          ></link>

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${SiteConfig.trackingID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${SiteConfig.trackingID}', { page_path: window.location.pathname });
            `,
            }}
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

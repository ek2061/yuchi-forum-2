import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <body className="min-h-screen bg-gray-100 pt-12">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import { Box, Stack } from "@chakra-ui/react";
import Head from "next/head";
import { Header } from "./Header";

interface BasicPageProps {
  title?: string;
  children?: React.ReactNode;
}

export const BasicPage = ({ title, children }: BasicPageProps) => {
  let pageTitle = "yuchi forum";
  if (title) pageTitle = `${title} | yuchi forum`;

  return (
    <Box background="gray.100">
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:site_name" content="yuchi-forum" />
        <meta property="og:title" content="yuchi forum" />
        <meta property="og:description" content="廢文製造機" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/yuchi-forum-logo.png`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <Stack direction="row" align="start" justify="center" h="full" w="full">
          {children}
        </Stack>
      </main>
    </Box>
  );
};

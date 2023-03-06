import { LeftSection } from "@/views/LeftSection";
import { RightSection } from "@/views/RightSection";
import { Box, HStack, VStack } from "@chakra-ui/react";
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
    <Box>
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
        <meta name="description" content="廢文製造機" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-6">
        <Header />
        <HStack align="start" justifyContent="center" w="full" mx="auto" px={3}>
          <LeftSection />
          <VStack spacing={3} w="full" maxW="728px">
            {children}
          </VStack>
          <RightSection />
        </HStack>
      </main>
    </Box>
  );
};

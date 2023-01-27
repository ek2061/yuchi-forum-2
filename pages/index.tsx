import { BasicPage } from "@/components/BasicPage";
import CenterSection from "@/components/CenterSection";
import LeftSection from "@/components/LeftSection";
import RightSection from "@/components/RightSection";
import { PostAbstractType } from "@/types/posts";
import { Stack } from "@chakra-ui/react";
import { Inter } from "@next/font/google";
import type { GetServerSideProps } from "next";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  posts: PostAbstractType[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <BasicPage>
      <Stack
        direction="row"
        align="start"
        justifyContent="center"
        w="full"
        mx="auto"
        px={3}
      >
        <LeftSection />
        <CenterSection posts={posts} />
        <RightSection />
      </Stack>
    </BasicPage>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    "https://yuchi-forum-backend.fly.dev/api/post?limit=5"
  );
  const posts = await res.json();

  return {
    props: { posts },
  };
};

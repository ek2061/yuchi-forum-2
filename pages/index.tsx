import { BasicPage } from "@/components/BasicPage";
import { PostAbstractType } from "@/types/posts";
import { CenterSection, LeftSection, RightSection } from "@/views/Home";
import { HStack } from "@chakra-ui/react";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";

const fetcher = async () => {
  const res = await fetch("/api/listPosts");
  const data: PostAbstractType[] = await res.json();
  return data;
};

const config: SWRConfiguration = {
  suspense: true,
  fallbackData: [],
  revalidateOnMount: true,
};

export default function Home() {
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR("/api/listPosts", fetcher, config);

  return (
    <BasicPage>
      <HStack align="start" justifyContent="center" w="full" mx="auto" px={3}>
        <LeftSection />
        <CenterSection posts={posts} error={error} isLoading={isLoading} />
        <RightSection />
      </HStack>
    </BasicPage>
  );
}

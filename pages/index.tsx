import { BasicPage } from "@/components/BasicPage";
import { PostAbstract } from "@/components/PostAbstract";
import { PostSkeleton } from "@/components/PostSkeleton";
import { PostAbstractType } from "@/types/posts";
import { fetcher } from "@/utils/fetcher";
import { LeftSection } from "@/views/LeftSection";
import { RightSection } from "@/views/RightSection";
import { Heading, HStack, VStack } from "@chakra-ui/react";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";

const config: SWRConfiguration = {
  suspense: true,
  fallbackData: [],
  revalidateOnMount: true,
};

export default function Home() {
  const path = "/api/listPosts";
  const { data, error, isLoading } = useSWR(path, () => fetcher(path), config);

  return (
    <BasicPage>
      <HStack align="start" justifyContent="center" w="full" mx="auto" px={3}>
        <LeftSection />

        <VStack spacing={3} w="full" h="full" maxW="728px">
          <Posts data={data} error={error} isLoading={isLoading} />
        </VStack>

        <RightSection />
      </HStack>
    </BasicPage>
  );
}

const Posts = ({
  data,
  error,
  isLoading,
}: {
  data: PostAbstractType[];
  error: any;
  isLoading: boolean;
}) => {
  if (error)
    return (
      <Heading size="lg" textAlign="center">
        Fetch Error
      </Heading>
    );

  if (isLoading) return <PostSkeleton type="abstract" />;

  if (!data || data?.length === 0)
    return (
      <Heading as="h4" size="md" textAlign="center">
        No one has found this yet, do you want to post an article?
      </Heading>
    );

  if (data?.length > 0) {
    return (
      <>
        {data.map((post) => (
          <PostAbstract key={post.pid} {...post} />
        ))}
      </>
    );
  }

  return <></>;
};

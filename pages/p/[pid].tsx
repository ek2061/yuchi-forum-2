import { BasicPage } from "@/components/BasicPage";
import { PostContent } from "@/components/PostContent";
import { PostSkeleton } from "@/components/PostSkeleton";
import { PostContentType } from "@/types/posts";
import { fetcher } from "@/utils/fetcher";
import { Heading, HStack, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";

const config: SWRConfiguration = {
  suspense: true,
  fallbackData: {},
  revalidateOnMount: true,
};

export default function Pid() {
  const router = useRouter();
  const { pid } = router.query;

  const path = `/api/findPost?pid=${pid}`;
  const { data, error, isLoading } = useSWR(path, () => fetcher(path), config);

  return (
    <BasicPage>
      <HStack align="start" justifyContent="center" w="full" mx="auto" px={3}>
        <VStack spacing={3} w="full" h="full" maxW="996px">
          <Post data={data} error={error} isLoading={isLoading} />
        </VStack>
      </HStack>
    </BasicPage>
  );
}

const Post = ({
  data,
  error,
  isLoading,
}: {
  data: PostContentType;
  error: any;
  isLoading: boolean;
}) => {
  if (error)
    return (
      <Heading size="lg" textAlign="center">
        Fetch Error
      </Heading>
    );

  if (isLoading) return <PostSkeleton type="content" />;

  if (!data)
    return (
      <Heading as="h4" size="md" textAlign="center">
        Article does not exist
      </Heading>
    );

  if (data) return <PostContent {...data} />;

  return <></>;
};

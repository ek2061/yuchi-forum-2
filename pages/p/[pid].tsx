import { BasicPage } from "@/components/BasicPage";
import { PostContent } from "@/components/PostContent";
import { PostSkeleton } from "@/components/PostSkeleton";
import { PostContentType } from "@/types/posts";
import { fetcher } from "@/utils/fetcher";
import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { SWRConfiguration } from "swr";
import useSWR, { useSWRConfig } from "swr";

export default function Pid() {
  const router = useRouter();
  const { pid } = router.query;

  const path = `/api/findPost?pid=${pid}`;
  const global_config: SWRConfiguration = useSWRConfig();

  const { data, error, isLoading } = useSWR(
    pid ? path : null,
    pid ? () => fetcher(path) : null,
    { ...global_config }
  );

  return (
    <BasicPage>
      <Post data={data} error={error} isLoading={isLoading} />
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

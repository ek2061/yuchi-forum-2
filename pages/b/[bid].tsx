import { BasicPage } from "@/components/BasicPage";
import { PostAbstract } from "@/components/PostAbstract";
import { PostSkeleton } from "@/components/PostSkeleton";
import { PostAbstractType } from "@/types/posts";
import { fetcher } from "@/utils/fetcher";
import { Box, Heading, HStack, Text, Tooltip } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import React from "react";
import type { SWRConfiguration } from "swr";
import useSWR, { useSWRConfig } from "swr";

export default function Bid() {
  const router = useRouter();
  const { bid } = router.query;

  const [prevbid, setPrevbid] = React.useState<string | undefined>(undefined);
  const [page, setPage] = React.useState<number>(1);
  const [path, setPath] = React.useState<string>(
    `/api/listPosts?page=1&bid=${bid}`
  );

  const [hasMore, setHasMore] = React.useState<boolean>(false);
  const [posts, setPosts] = React.useState<PostAbstractType[]>([]);

  const observer = React.useRef<IntersectionObserver | null>(null);

  const global_config: SWRConfiguration = useSWRConfig();

  const { data, error, isLoading } = useSWR(path, () => fetcher(path), {
    ...global_config,
  });

  React.useEffect(() => {
    if (data?.length > 0) {
      setPosts([...posts, ...data]);
      setHasMore(true);
    } else setHasMore(false);
    // eslint requires dependencies must add `posts`, but in fact it should not be added
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  React.useEffect(() => {
    if (bid !== prevbid) {
      setPrevbid(bid as string);
      setPage(1);
      setPosts([]);
    }
    setPath(`/api/listPosts?page=${page}&bid=${prevbid}`);
  }, [page, bid, prevbid]);

  const lastItemRef = React.useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <BasicPage title={`${bid} board`}>
      <Box
        h={12}
        w="full"
        px={3}
        py={2}
        position="sticky"
        top="48px"
        zIndex={100}
        bg="white"
        borderTopRadius={6}
        boxShadow="sm"
      >
        <HStack minH={8} alignSelf="center" spacing={6}>
          <Tooltip label="back">
            <ArrowLeftIcon
              className="h-9 w-9 rounded-full p-2 hover:bg-gray-200"
              onClick={() => router.push("/b/all")}
            />
          </Tooltip>
          <Heading fontSize="lg" alignSelf="center">
            {bid}
          </Heading>
        </HStack>
      </Box>
      <Posts
        posts={posts}
        error={error}
        isLoading={isLoading}
        lastItemRef={lastItemRef}
        hasMore={hasMore}
      />
    </BasicPage>
  );
}

const Posts = ({
  posts,
  error,
  isLoading,
  lastItemRef,
  hasMore,
}: {
  posts: PostAbstractType[];
  error: any;
  isLoading: boolean;
  lastItemRef: React.Ref<HTMLDivElement>;
  hasMore: boolean;
}) => {
  if (error)
    return (
      <Heading size="lg" textAlign="center">
        Fetch Error
      </Heading>
    );

  if (isLoading && posts?.length === 0) return <PostSkeleton type="abstract" />;

  if (!posts || posts?.length === 0)
    return (
      <Heading as="h4" size="md" textAlign="center">
        No one has found this yet, do you want to post an article?
      </Heading>
    );

  if (posts?.length > 0) {
    return (
      <>
        {posts.map((post, index) => {
          if (index === posts.length - 1)
            return <PostAbstract key={post.pid} {...post} ref={lastItemRef} />;
          else return <PostAbstract key={post.pid} {...post} />;
        })}
        {isLoading && <PostSkeleton type="abstract" />}
        {!hasMore && <Text fontSize="xl">no more articles</Text>}
      </>
    );
  }

  return <></>;
};

import { BasicPage } from "@/components/BasicPage";
import { PostAbstract } from "@/components/PostAbstract";
import { PostSkeleton } from "@/components/PostSkeleton";
import { PostAbstractType } from "@/types/posts";
import { fetcher } from "@/utils/fetcher";
import { Heading, Text } from "@chakra-ui/react";
import React from "react";
import type { SWRConfiguration } from "swr";
import useSWR, { useSWRConfig } from "swr";

export default function Home() {
  const [page, setPage] = React.useState<number>(1);
  const [path, setPath] = React.useState<string>("/api/listPosts?page=1");
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
    setPath(`/api/listPosts?page=${page}`);
  }, [page]);

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
    <BasicPage>
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

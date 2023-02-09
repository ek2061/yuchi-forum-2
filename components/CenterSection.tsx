import { PostAbstractType } from "@/types/posts";
import { Heading, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { PostAbstract } from "./PostAbstract";
import { PostSkeleton } from "./PostSkeleton";

interface CenterSectionProps {
  posts: PostAbstractType[] | undefined;
  error: Error;
  isLoading: boolean;
}

const Container = ({ children }: { children?: ReactNode }) => (
  <Stack spacing={3} w="full" h="full" maxW="728px">
    {children}
  </Stack>
);

function CenterSection({ posts, error, isLoading }: CenterSectionProps) {
  if (error) return <Container>Fetch Error</Container>;

  if (isLoading)
    return (
      <Container>
        <PostSkeleton />
      </Container>
    );

  if (!posts || posts?.length === 0)
    return (
      <Container>
        <Heading as="h4" size="md" textAlign="center">
          No one has found this yet, do you want to post an article?
        </Heading>
      </Container>
    );

  if (posts?.length > 0)
    return (
      <Container>
        {posts.map((p) => (
          <PostAbstract key={p.pid} {...p} comment={0} />
        ))}
      </Container>
    );
  return <Container></Container>;
}

export default CenterSection;

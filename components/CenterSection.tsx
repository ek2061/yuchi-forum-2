import { PostAbstractType } from "@/types/posts";
import { Stack } from "@chakra-ui/react";
import { PostAbstract } from "./PostAbstract";

interface CenterSectionProps {
  posts: PostAbstractType[];
}

function CenterSection({ posts }: CenterSectionProps) {
  return (
    <Stack spacing={3} w="full" h="full" maxW="728px">
      {posts &&
        posts.map((p) => <PostAbstract key={p.pid} {...p} comment={0} />)}
    </Stack>
  );
}

export default CenterSection;

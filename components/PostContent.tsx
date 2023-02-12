import { CommentType, PostContentType } from "@/types/posts";
import { fetcher } from "@/utils/fetcher";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import { Comment } from "./Comment";
import { CommentCol } from "./CommentCol";
import { CommentSkeleton } from "./CommentSkeleton";

const config: SWRConfiguration = {
  suspense: true,
  fallbackData: [],
  revalidateOnMount: true,
};

export const PostContent = ({
  uid,
  nickname,
  createdAt,
  title,
  content,
  like,
  dislike,
}: PostContentType) => {
  const router = useRouter();
  const { pid } = router.query;

  const path = `/api/listComments?pid=${pid}`;
  const { data, error, isLoading } = useSWR(path, () => fetcher(path), config);
  return (
    <Card width="full" shadow="md">
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={nickname} />

            <Box>
              <Tooltip label={uid} placement="top-start">
                <Heading size="sm">{nickname}</Heading>
              </Tooltip>
              <Text color="GrayText" fontSize="sm">
                {createdAt}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody px={7} py={0}>
        <VStack>
          <Heading size="lg" alignSelf="start">
            {title}
          </Heading>
          <Text fontSize="lg">{content}</Text>
        </VStack>
      </CardBody>

      <CardFooter>
        <HStack>
          <Button
            leftIcon={<HandThumbUpIcon className="mr-1 h-5 w-5" />}
            colorScheme="twitter"
            variant="outline"
          >
            {like}
          </Button>
          <Button
            leftIcon={<HandThumbDownIcon className="mr-1 h-5 w-5" />}
            colorScheme="twitter"
            variant="outline"
          >
            {dislike}
          </Button>
        </HStack>
      </CardFooter>

      <Divider mx={5} w="auto" borderBottomColor="gray.400" />

      <CommentCol />

      <Divider mx={5} mb={4} w="auto" borderBottomColor="gray.400" />

      <CardBody>
        <Comments data={data} error={error} isLoading={isLoading} />
      </CardBody>
    </Card>
  );
};

const Comments = ({
  data,
  error,
  isLoading,
}: {
  data: CommentType[];
  error: any;
  isLoading: boolean;
}) => {
  if (error)
    return (
      <Heading size="lg" textAlign="center">
        Fetch Error
      </Heading>
    );

  if (isLoading) return <CommentSkeleton />;

  if (!data || data.length === 0)
    return (
      <Heading as="h4" size="md" textAlign="center">
        There is no comment now, do you want to leave something for the author?
      </Heading>
    );

  if (data.length > 0) {
    return (
      <>
        {data?.map((comment, key: number) => (
          <Comment key={key} {...comment} />
        ))}
      </>
    );
  }

  return <></>;
};

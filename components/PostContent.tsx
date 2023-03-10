import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { closeModal } from "@/store/login.slice";
import { CommentType, PostContentType } from "@/types/posts";
import { fetcher } from "@/utils/fetcher";
import { LoginModal } from "@/views/LoginModal";
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
import {
  ArrowLeftIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { SWRConfiguration } from "swr";
import useSWR, { useSWRConfig } from "swr";
import { Comment } from "./Comment";
import { CommentCol, MustBeLoggedIn } from "./CommentCol";
import { CommentSkeleton } from "./CommentSkeleton";

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
  const global_config: SWRConfiguration = useSWRConfig();

  const { data, error, isLoading } = useSWR(
    pid ? path : null,
    pid ? () => fetcher(path) : null,
    { ...global_config }
  );

  const { data: session } = useSession();

  const dispatch = useAppDispatch();
  const onCloseLoginModal = () => dispatch(closeModal());
  const { modalVis } = useAppSelector((state) => state.login);

  return (
    <Card w="full" shadow="md">
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
              onClick={() => router.push("/")}
            />
          </Tooltip>
          <Heading fontSize="lg" alignSelf="center">
            Post
          </Heading>
        </HStack>
      </Box>

      <CardHeader>
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
      </CardHeader>

      <CardBody px={7} py={0}>
        <VStack align="start">
          <Heading size="lg">{title}</Heading>
          <Text fontSize="lg" whiteSpace="pre-line">
            {content}
          </Text>
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

      {session ? <CommentCol /> : <MustBeLoggedIn />}

      <Divider mx={5} w="auto" borderBottomColor="gray.400" />

      <CardBody>
        <Comments data={data} error={error} isLoading={isLoading} />
      </CardBody>

      {modalVis && <LoginModal isOpen={modalVis} onClose={onCloseLoginModal} />}
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

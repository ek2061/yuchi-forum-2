import { PostAbstractType } from "@/types/posts";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

const textEllipsis = {
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  wordBreak: "break-word !important",
  overflowWrap: "break-word !important",
  hyphens: "auto !important",
};

export const PostAbstract = React.forwardRef(
  (
    {
      pid,
      nickname,
      createdAt,
      title,
      excerpt,
      like,
      dislike,
    }: PostAbstractType,
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <Card width="full" shadow="md" ref={ref}>
        <CardHeader>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name={nickname} /*src="https://bit.ly/sage-adebayo"*/ />

              <Box>
                <Heading size="sm">{nickname}</Heading>
                <Text>{createdAt}</Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>

        <CardBody py={0}>
          <Heading size="md" lineHeight={7} sx={textEllipsis}>
            <Link
              href={`/p/${pid}`}
              className="text-blue-500 hover:text-blue-400"
            >
              {title}
            </Link>
          </Heading>
          <Text sx={textEllipsis}>{excerpt}</Text>
        </CardBody>

        <CardFooter justify="end" flexWrap="wrap" gap={2}>
          <Flex>
            <HandThumbUpIcon className="mr-1 h-5 w-5" />
            <Text>{like}</Text>
          </Flex>

          <Flex>
            <HandThumbDownIcon className="mr-1 h-5 w-5" />
            <Text>{dislike}</Text>
          </Flex>
        </CardFooter>
      </Card>
    );
  }
);

PostAbstract.displayName = "PostAbstract";

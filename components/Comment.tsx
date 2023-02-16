import { CommentType } from "@/types/posts";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

export const Comment = ({ uid, nickname, createdAt, content }: CommentType) => {
  return (
    <Flex flex="1" alignItems="center" flexWrap="wrap" pt={2}>
      <Flex gap="4">
        <Avatar name={nickname} w="42px" h="42px" />

        <Box>
          <Wrap alignItems="center">
            <WrapItem h={3}>
              <Tooltip label={uid} placement="top-start">
                <Heading size="sm">{nickname}</Heading>
              </Tooltip>
              <Box _after={{ content: '"．"' }} />
            </WrapItem>
            <WrapItem>
              <Text color="GrayText" fontSize="sm">
                {createdAt}
              </Text>
            </WrapItem>
          </Wrap>
          <Text whiteSpace="pre-line">{content}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

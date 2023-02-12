import { CommentType } from "@/types/posts";
import { Avatar, Box, Flex, Heading, Text, Tooltip } from "@chakra-ui/react";

export const Comment = ({ uid, nickname, createdAt, content }: CommentType) => {
  return (
    <Flex flex="1" alignItems="center" flexWrap="wrap">
      <Flex gap="4">
        <Avatar name={nickname} w="42px" h="42px" />

        <Box>
          <Flex alignItems="center">
            <Tooltip label={uid} placement="top-start">
              <Heading size="sm">{nickname}</Heading>
            </Tooltip>
            <Box _after={{ content: '"．"' }} />
            <Text color="GrayText" fontSize="sm">
              {createdAt}
            </Text>
          </Flex>
          <Text>{content}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

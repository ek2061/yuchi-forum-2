import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

export const CommentSkeleton = () => {
  return (
    <Flex flex="1" alignItems="center" flexWrap="wrap" w="full">
      <Flex gap="4" w="full">
        <SkeletonCircle size="10" />

        <Box w="full">
          <Skeleton h="15px" w="full" maxW="280px" mt={1} mb={4} />
          <SkeletonText noOfLines={3} spacing="2" skeletonHeight="4" />
        </Box>
      </Flex>
    </Flex>
  );
};

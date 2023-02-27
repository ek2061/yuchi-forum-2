import { Box, Button, HStack, Skeleton } from "@chakra-ui/react";

export const AllBoardsSkeleton = () => {
  return (
    <Box>
      <HStack justifyContent="space-between" h="40px">
        <Skeleton h="25px" w="full" maxW="150px" />
        <Button bg="green.100" color="white">
          Follow
        </Button>
      </HStack>
    </Box>
  );
};

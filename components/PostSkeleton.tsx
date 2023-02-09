import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  ChatBubbleLeftEllipsisIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";

export const PostSkeleton = () => {
  return (
    <Card width="full" shadow="md">
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <SkeletonCircle size="10" />

            <VStack spacing={2} alignItems="start" flexGrow={1}>
              <Skeleton h="15px" w="100%" maxW="100px" />
              <Skeleton h="15px" w="100%" maxW="160px" />
            </VStack>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody py={0}>
        <SkeletonText noOfLines={3} spacing="2" skeletonHeight="4" />
      </CardBody>

      <CardFooter justify="end" flexWrap="wrap" gap={2}>
        <Flex>
          <HandThumbUpIcon className="mr-1 h-5 w-5" />
          <Text>0</Text>
        </Flex>

        <Flex>
          <HandThumbDownIcon className="mr-1 h-5 w-5" />
          <Text>0</Text>
        </Flex>

        <Flex>
          <ChatBubbleLeftEllipsisIcon className="mr-1 h-5 w-5" />
          <Text>0</Text>
        </Flex>
      </CardFooter>
    </Card>
  );
};

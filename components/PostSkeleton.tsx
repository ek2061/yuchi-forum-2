import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";

export const PostSkeleton = ({ type }: { type: "abstract" | "content" }) => {
  return (
    <Card w="full" shadow="md">
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <SkeletonCircle size="12" />

            <VStack spacing={2} alignItems="start" flexGrow={1}>
              <Skeleton h="15px" w="full" maxW="100px" />
              <Skeleton h="15px" w="full" maxW="160px" />
            </VStack>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody py={0}>
        <SkeletonText noOfLines={3} spacing="2" skeletonHeight="4" />
      </CardBody>

      {type === "abstract" ? <AbstractFooter /> : <ContentFooter />}
    </Card>
  );
};

const AbstractFooter = () => {
  return (
    <CardFooter justify="end" flexWrap="wrap" gap={2}>
      <Flex>
        <HandThumbUpIcon className="mr-1 h-5 w-5" />
        <Text>0</Text>
      </Flex>

      <Flex>
        <HandThumbDownIcon className="mr-1 h-5 w-5" />
        <Text>0</Text>
      </Flex>
    </CardFooter>
  );
};

const ContentFooter = () => {
  return (
    <CardFooter>
      <HStack>
        <Button
          leftIcon={<HandThumbUpIcon className="mr-1 h-5 w-5" />}
          colorScheme="twitter"
          variant="outline"
        >
          0
        </Button>
        <Button
          leftIcon={<HandThumbDownIcon className="mr-1 h-5 w-5" />}
          colorScheme="twitter"
          variant="outline"
        >
          0
        </Button>
      </HStack>
    </CardFooter>
  );
};

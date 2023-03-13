import { HotBoardType } from "@/types/hotboard";
import { Box, Button, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { FireIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const AllBoardsCard = ({ bid, name, volume }: HotBoardType) => {
  return (
    <Box>
      <HStack justifyContent="space-between">
        <Link href={`/b/${bid}`}>
          <Heading
            size="md"
            textTransform="uppercase"
            color="blue.300"
            _hover={{ color: "blue.400" }}
          >
            {name}
          </Heading>
        </Link>

        <HStack>
          <Flex align="center">
            <FireIcon className="h-4 w-4" />
            <Text>{volume}</Text>
          </Flex>

          <Button
            bg="green.300"
            color="white"
            _hover={{ bg: "green.400" }}
            _active={{ bg: "green.500" }}
          >
            Follow
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

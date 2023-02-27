import { HotBoardType } from "@/types/hotboard";
import { fetcher } from "@/utils/fetcher";
import {
  Box,
  CircularProgress,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { DocumentIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import type { SWRConfiguration } from "swr";
import useSWR, { useSWRConfig } from "swr";

export const LeftSection = () => {
  const path = "/api/board/recommend";
  const global_config: SWRConfiguration = useSWRConfig();

  const { data, error, isLoading } = useSWR(path, () => fetcher(path), {
    ...global_config,
  });

  return (
    <Box
      background="white"
      display={{ base: "none", md: "block" }}
      borderRadius="lg"
      minW={208}
    >
      <VStack align="stretch" my={2} px={2} w="full">
        <Text fontSize="sm" px={2} color="gray.400" fontWeight="bold">
          FEEDS
        </Text>
        <LinkItem title="Home" href="/" />
        <LinkItem title="All Boards" href="/b/all" />
        <LinkItem title="Hot Boards" href="/b/hot" />

        <Text fontSize="sm" px={2} color="gray.400" fontWeight="bold">
          RECOMMEND
        </Text>
        <Recommend data={data} error={error} isLoading={isLoading} />
      </VStack>
    </Box>
  );
};

const Recommend = ({
  data,
  error,
  isLoading,
}: {
  data: HotBoardType[];
  error: any;
  isLoading: boolean;
}) => {
  if (error)
    return (
      <Heading size="md" textAlign="center">
        Fetch Error
      </Heading>
    );

  if (isLoading)
    return (
      <CircularProgress
        isIndeterminate
        color="cyan.300"
        display="flex"
        justifyContent="center"
      />
    );

  if (!data || data?.length === 0)
    return (
      <Heading as="h4" size="md" textAlign="center">
        No Board
      </Heading>
    );

  if (data?.length > 0) {
    return (
      <VStack spacing={1} align="stretch" w="full">
        {data.map((board) => (
          <LinkItem
            key={board.bid}
            title={board.name}
            href={`/b/${board.bid}`}
          />
        ))}
      </VStack>
    );
  }

  return <></>;
};

const LinkItem = ({ title, href }: { title: string; href: string }) => {
  return (
    <Link href={href}>
      <Box
        px={2}
        py={1}
        cursor="pointer"
        _hover={{ bg: "cyan.100" }}
        _active={{ bg: "cyan.200" }}
        borderRadius="md"
        userSelect="none"
      >
        <HStack pl={3}>
          <DocumentIcon className="h-4 w-4" />
          <Text fontSize="lg" fontWeight="bold" color="gray.600" noOfLines={1}>
            {title}
          </Text>
        </HStack>
      </Box>
    </Link>
  );
};

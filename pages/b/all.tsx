import { AllBoardsCard } from "@/components/AllBoardsCard";
import { AllBoardsSkeleton } from "@/components/AllBoardsSkeleton";
import { BasicPage } from "@/components/BasicPage";
import { HotBoardType } from "@/types/hotboard";
import { fetcher } from "@/utils/fetcher";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import type { SWRConfiguration } from "swr";
import useSWR, { useSWRConfig } from "swr";

export default function AllBoard() {
  const path = `/api/board/all`;
  const global_config: SWRConfiguration = useSWRConfig();

  const { data, error, isLoading } = useSWR(path, () => fetcher(path), {
    ...global_config,
  });

  return (
    <BasicPage>
      <Card w="full" shadow="md">
        <CardHeader>
          <Heading size="lg">All Boards</Heading>
        </CardHeader>

        <CardBody>
          <Boards boards={data} error={error} isLoading={isLoading} />
        </CardBody>
      </Card>
    </BasicPage>
  );
}

const Boards = ({
  boards,
  error,
  isLoading,
}: {
  boards: HotBoardType[];
  error: any;
  isLoading: boolean;
}) => {
  if (error)
    return (
      <Heading size="lg" textAlign="center">
        Fetch Error
      </Heading>
    );

  if (isLoading) return <AllBoardsSkeleton />;

  if (!boards || boards?.length === 0)
    return (
      <Heading as="h4" size="md" textAlign="center">
        No Boards
      </Heading>
    );

  if (boards?.length > 0) {
    return (
      <Stack divider={<StackDivider />} spacing="4">
        {boards.map((board) => (
          <AllBoardsCard key={board.bid} {...board} />
        ))}
      </Stack>
    );
  }

  return <></>;
};

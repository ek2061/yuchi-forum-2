import { BasicPage } from "@/components/BasicPage";
import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Bid() {
  const router = useRouter();
  const { bid } = router.query;

  return (
    <BasicPage>
      <Text>{bid}</Text>
    </BasicPage>
  );
}

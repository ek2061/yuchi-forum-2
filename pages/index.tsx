import { BasicPage } from "@/components/BasicPage";
import CenterSection from "@/components/CenterSection";
import LeftSection from "@/components/LeftSection";
import RightSection from "@/components/RightSection";
import { Stack } from "@chakra-ui/react";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <BasicPage>
      <Stack
        direction="row"
        align="start"
        justifyContent="center"
        w="full"
        mx="auto"
        px={3}
      >
        <LeftSection />
        <CenterSection />
        <RightSection />
      </Stack>
    </BasicPage>
  );
}

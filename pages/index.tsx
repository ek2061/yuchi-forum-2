import { BasicPage } from "@/components/BasicPage";
import { Stack } from "@chakra-ui/react";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <BasicPage>
      <Stack
        direction="column"
        align="center"
        justifyContent="center"
        minHeight="100vh"
        width="100%"
        paddingTop={12}
      >
        <div>123</div>
      </Stack>
    </BasicPage>
  );
}

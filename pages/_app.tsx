import { store } from "@/store";
import "@/styles/globals.css";
import theme from "@/theme";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";

const ChakraProvider = dynamic(
  () =>
    import("@chakra-ui/react").then((chakra) => {
      return chakra.ChakraProvider;
    }),
  { ssr: false }
);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <SWRConfig
            value={{
              suspense: true,
              revalidateOnMount: true,
              fallbackData: null,
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </ChakraProvider>
      </Provider>
    </SessionProvider>
  );
}

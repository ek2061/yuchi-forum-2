import { store } from "@/store";
import "@/styles/globals.css";
import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";

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

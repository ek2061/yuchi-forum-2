import { store } from "@/store";
import "@/styles/globals.css";
import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  return (
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
  );
}

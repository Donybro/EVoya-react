import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../app/store/store";
import { Provider } from "react-redux";
import "../app/components/common/Select/select.scss";

import { Poppins } from "@next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${poppins.style.fontFamily};
          }
        `}
      </style>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </QueryClientProvider>
    </>
  );
}

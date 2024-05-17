import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  // return <Component {...pageProps} />;
  return (
    <>
      {/* Provide the client to our App */}
      <QueryClientProvider client={queryClient}>
        {/* <ProgressBar
        height="4px"
        color="red"
        options={{ showSpinner: false }}
        shallowRouting
      /> */}
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

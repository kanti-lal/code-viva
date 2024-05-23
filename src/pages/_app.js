import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@/styles/navbar.css";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "@/context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import RootLayout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
          <ToastContainer />
        </AuthContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

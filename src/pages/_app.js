import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@/styles/navbar.css";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "@/context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import NoLayout from "@/components/Layout/NoLayout";
import RootLayout from "@/components/Layout";
import AuthLayout from "@/components/Layout/AuthLayout";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  // const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();

  const { pathname } = router;

  const getLayout = () => {
    if (pathname === "/login" || pathname === "/sign-up") {
      return AuthLayout;
    } else if (pathname === "/other") {
      return NoLayout;
    } else {
      return RootLayout;
    }
  };

  const Layout = getLayout();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer />
        </AuthContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

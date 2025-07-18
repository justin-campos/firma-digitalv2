import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { AppTheme } from "@/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { SnackbarProvider } from "notistack";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AppTheme>
            <QueryClientProvider client={queryClient}>
              {getLayout(<Component {...pageProps} />)}
            </QueryClientProvider>
          </AppTheme>
        </LocalizationProvider>
      </SnackbarProvider>
    </>
  );
}

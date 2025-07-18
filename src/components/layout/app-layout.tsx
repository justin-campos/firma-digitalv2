import Head from "next/head";
import { Box, CssBaseline, Stack } from "@mui/material";
import { FC, ReactNode } from "react";
import {
  AppNavbar,
  Footer,
  HeaderComponent,
  InformacionUsuario,
  MainGrid,
} from "@/components";

type AppLayoutProps = {
  title: string;
  children: ReactNode;
};

export const AppLayout: FC<AppLayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title} | Fleming</title>
      </Head>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <AppNavbar />
          <HeaderComponent />
            <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
            </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

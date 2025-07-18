import { Box, CssBaseline } from "@mui/material";
import Head from "next/head";
import { FC } from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout: FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title} | Fleming</title>
      </Head>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: "black",
        }}
      >
        {children}
      </Box>
    </>
  );
};

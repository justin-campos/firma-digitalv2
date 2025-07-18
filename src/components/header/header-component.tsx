import { FC } from "react";
import { Box, AppBar, Toolbar } from "@mui/material";
import Image from "next/image";
import { FechaAnimacion } from "@/components/fecha_animacion";

interface Props {
  open?: boolean;
}

export const HeaderComponent: FC<Props> = ({ open }) => {
  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        justifyContent: "center",
        flexDirection: "row",
        display: { xs: "none", md: "flex" },
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "center",
          padding: "0 !important",
          margin: 0,
          width: "100%",
          minHeight: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
        >
          <Box
            sx={{
              width: 400,
              height: 55,
              display: open ? "none" : "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/FLEMING.png"
              alt="Logo"
              width={600}
              height={600}
              style={{ objectFit: "contain" }}
              priority
            />
          </Box>
        </Box>
      </Toolbar>
      <Box
        sx={{
          position: "absolute",
          mt: 3,
          mr: 1,
          top: 0,
          right: 0,
        }}
      >
        <FechaAnimacion />
      </Box>
    </AppBar>
  );
};

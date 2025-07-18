import { Box, styled, Stack, AppBar, tabsClasses } from "@mui/material";
import MuiToolbar from "@mui/material/Toolbar";
import Image from "next/image";
import { FechaAnimacion } from "@/components/fecha_animacion";

const Toolbar = styled(MuiToolbar)({
  width: "100%",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "center",
  gap: "12px",
  flexShrink: 0,
  [`& ${tabsClasses.flexContainer}`]: {
    gap: "8px",
    p: "8px",
    pb: 0,
  },
});

export const AppNavbar = () => {
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          display: { xs: "auto", md: "none" },
          boxShadow: 0,
          borderBottom: "1px solid",
          borderColor: "divider",
          top: "var(--template-frame-height, 0px)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar variant="regular">
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              flexGrow: 1,
              width: "100%",
              gap: 1,
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                justifyContent: "center",
                mr: "auto",
              }}
            >
              <Box
                sx={{
                  width: 160,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/images/FLEMING.png"
                  alt="Logo"
                  width={450}
                  height={500}
                  style={{ objectFit: "contain" }}
                  priority
                />
              </Box>
            </Stack>
            {/*<ColorChangeDropdown />*/}
            <Box
              sx={{
                ml: "auto",
                justifyContent: "flex-end",
              }}
            >
              <FechaAnimacion />
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

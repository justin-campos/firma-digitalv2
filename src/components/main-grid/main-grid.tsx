import { FC, ReactNode } from "react";
import Box from "@mui/material/Box";

interface MainGridProps {
  children?: ReactNode;
}

export const MainGrid: FC<MainGridProps> = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1900px" },
      }}
    >
      <Box
        component={"section"}
        sx={{
          display: "flex",
          border: "2px solid yellow",
          height: "calc(100vh - 20px)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

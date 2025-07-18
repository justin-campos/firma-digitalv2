import { Box, Paper } from "@mui/material";

export const Footer = () => {
  return (
    <Paper
      component="footer"
      square
      variant="outlined"
      sx={{
        p: 0,
        fontSize: 12,
        marginTop: "calc(10% + 60px)",
        position: "fixed",
        bottom: 0,
        width: "100%",
        color: "common.white",
        backgroundColor: "footer.primary",
      }}
    >
      <Box display="flex" justifyContent="flex-end">
        <span>v 1.0.1 | 2024-08-09 11:25</span>
      </Box>
    </Paper>
  );
};

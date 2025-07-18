import { Components, Theme } from "@mui/material/styles";

export const appBarCustomizations: Components<Theme> = {
  MuiAppBar: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.appBar.main,
        ...theme.applyStyles("dark", {
          backgroundColor: theme.palette.appBar.main,
        }),
      }),
    },
    defaultProps: {
      elevation: 0,
      position: "static",
      color: "default",
    },
  },
};

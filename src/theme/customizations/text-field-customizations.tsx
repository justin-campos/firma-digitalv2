import { Components, Theme } from "@mui/material";

export const textFieldCustomizations: Components<Theme> = {
  MuiTextField: {
    defaultProps: {
      variant: "filled",
      fullWidth: true,
      margin: "normal",
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        backgroundColor: "#e0e0e0",
        borderRadius: 4,

        "&:hover": { backgroundColor: "#ccc" },
        "&.Mui-focused": { backgroundColor: "#d5d5d5" },
        minHeight: ownerState.size === "small" ? 40 : 56,
        fontSize: ownerState.size === "small" ? "0.95rem" : "1.1rem",

        "& .MuiFilledInput-underline:after": {
          borderBottomColor: "pink",
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "blue",
          },
        },
      }),
      input: {
        color: "#000",
        "& label.Mui-focused": {
          borderBottomColor: "#ff0303",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#ff0000",
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: "#555",
        "&.Mui-focused": { color: "#555" },
      },
    },
  },
};

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { FC, ReactNode, useMemo } from "react";
import { colorSchemes, typography, shadows, shape } from "./themePrimitives";
import {
  appBarCustomizations,
  textFieldCustomizations,
} from "@/theme/customizations";

interface AppThemeProps {
  children: ReactNode;
  disableCustomTheme?: boolean;
}

export const AppTheme: FC<AppThemeProps> = ({
  children,
  disableCustomTheme,
}) => {
  const theme = useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          cssVariables: {
            colorSchemeSelector: "data-mui-color-scheme",
            cssVarPrefix: "template",
          },
          colorSchemes: colorSchemes,
          typography,
          shadows,
          shape,
          components: { ...appBarCustomizations, ...textFieldCustomizations },
        });
  }, [disableCustomTheme]);

  return (
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

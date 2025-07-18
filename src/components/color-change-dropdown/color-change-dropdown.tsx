import { useColorScheme } from "@mui/material/styles";
import { Menu, MenuItem, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useState } from "react";

export const ColorChangeDropdown = () => {
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleMode = (targetMode: "system" | "light" | "dark") => () => {
    setMode(targetMode);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen} color="inherit">
        <Brightness4Icon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem selected={mode === "system"} onClick={handleMode("system")}>
          Sistema
        </MenuItem>
        <MenuItem selected={mode === "light"} onClick={handleMode("light")}>
          Claro
        </MenuItem>
        <MenuItem selected={mode === "dark"} onClick={handleMode("dark")}>
          Oscuro
        </MenuItem>
      </Menu>
    </>
  );
};

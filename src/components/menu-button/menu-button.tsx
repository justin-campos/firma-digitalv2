import { FC } from "react";
import Badge, { badgeClasses } from "@mui/material/Badge";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

export interface MenuButtonProps extends IconButtonProps {
  showBadge?: boolean;
}

export const MenuButton: FC<MenuButtonProps> = ({
  showBadge = false,
  ...props
}) => {
  return (
    <Badge
      color="error"
      variant="dot"
      invisible={!showBadge}
      sx={{ [`& .${badgeClasses.badge}`]: { right: 2, top: 2 } }}
    >
      <IconButton size="small" {...props} />
    </Badge>
  );
};

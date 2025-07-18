import {
  Button,
  Avatar,
  drawerClasses,
  Drawer,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { MenuButton, MenuContent } from "@/components";
import { LogoutRounded, NotificationsRounded } from "@mui/icons-material";

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export const SideMenuMobile: FC<SideMenuMobileProps> = ({
  open,
  toggleDrawer,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: "none",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: "70dvw",
          height: "100%",
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: "center", flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt="Riley Carter"
              src="/static/images/avatar/7.jpg"
              sx={{ width: 24, height: 24 }}
            />
            <Typography component="p" variant="h6">
              Riley Carter
            </Typography>
          </Stack>
          <MenuButton showBadge>
            <NotificationsRounded />
          </MenuButton>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent open={true} />
          <Divider />
        </Stack>
        {/*<CardAlert />*/}
        <Stack sx={{ p: 2 }}>
          <Button variant="outlined" fullWidth startIcon={<LogoutRounded />}>
            Logout
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
};

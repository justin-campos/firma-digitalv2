import { List, Stack } from "@mui/material";

export const MenuContent = () => {
  return (
    <Stack
      sx={{
        flexGrow: 1,
        p: 0,
        justifyContent: "space-between",
        border: "0px solid red",
      }}
    >
      <List dense>
        {/*{selectedId != "" ? (*/}
        {/*  modulos.map((item, index) => {*/}
        {/*    const icon =*/}
        {/*      iconosModulos[item.nombre as keyof typeof iconosModulos] ||*/}
        {/*      faQuestionCircle;*/}

        {/*    return (*/}
        {/*      <ListItem key={index} disablePadding sx={{ display: "block" }}>*/}
        {/*        <Tooltip title={!open ? item.nombre : ""} placement="right">*/}
        {/*          <ListItemButton*/}
        {/*            selected={index === 0}*/}
        {/*            sx={{*/}
        {/*              justifyContent: open ? "initial" : "center",*/}
        {/*              minHeight: open ? 24 : 48,*/}
        {/*              px: 2.5,*/}
        {/*              color: "hsl(0, 0%, 100%)",*/}
        {/*            }}*/}
        {/*          >*/}
        {/*            <FontAwesomeIcon*/}
        {/*              icon={icon}*/}
        {/*              style={{ marginRight: open ? 8 : 0 }}*/}
        {/*            />*/}
        {/*            /!*{open && item.nombre}*!/*/}
        {/*            {open && <ListItemText primary={item.nombre} />}*/}
        {/*          </ListItemButton>*/}
        {/*        </Tooltip>*/}
        {/*      </ListItem>*/}
        {/*    );*/}
        {/*  })*/}
        {/*) : (*/}
        {/*  <Typography>...</Typography>*/}
        {/*)}*/}
      </List>
    </Stack>
  );
};

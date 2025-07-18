import { ReactNode } from "react";
import { AppLayout, Mensaje } from "@/components";
import { Box, Grid } from "@mui/material";
import { useStore } from "@/store";

const Inicio = () => {
  const mensaje = useStore((state) => state.mensaje);

  return (
    <Grid spacing={2} sx={{ flexGrow: 1 }}>
      <Box p={4} maxWidth="lg" mx="auto">
        {mensaje && <Mensaje />}
      </Box>
    </Grid>
  );
};

Inicio.getLayout = function getLayout(children: ReactNode) {
  return <AppLayout title="Firma Digital">{children}</AppLayout>;
};

export default Inicio;

import { AppLayout, Mensaje } from "@/components";
import { Box} from "@mui/material";
import { useStore } from "@/store";
import {ReactNode } from "react";
import FormularioMinsa from "@/components/registrar-medico/registrar-medico";

const medicoPage = () => {
    const mensaje = useStore((state) => state.mensaje);

    return (
        <Box maxWidth="lg" mx="auto" p={4}>
            {mensaje && <Mensaje />}
            <FormularioMinsa />
        </Box>
    );
};

medicoPage.getLayout = function getLayout(children: ReactNode) {
    return <AppLayout title="medico Firma">{children}</AppLayout>;
};

export default medicoPage;

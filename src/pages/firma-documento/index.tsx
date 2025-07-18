import dynamic from 'next/dynamic';
import { AppLayout, Mensaje } from "@/components";
import { Box, Grid } from "@mui/material";
import { useStore } from "@/store";
import {ReactNode, useState} from "react";
import Firma from "@/components/firma/firma"

const PdfSigner = dynamic(() => import('@/components/pdf-firma/pdf-firma'), { ssr: false });

const FirmadorPage = () => {
    const mensaje = useStore((state) => state.mensaje);
    const [firmaDibujada, setFirmaDibujada] = useState<string | null>(null);

    return (
        <Box maxWidth="lg" mx="auto" p={4}>
            {mensaje && <Mensaje />}
            <PdfSigner firmaDibujada={firmaDibujada} />

            <Box sx={{ mt: 3 }}>
                <Firma onSave={(dataUrl) => setFirmaDibujada(dataUrl)} />
            </Box>
        </Box>
    );
};



FirmadorPage.getLayout = function getLayout(children: ReactNode) {
    return <AppLayout title="Firma Digital">{children}</AppLayout>;
};

export default FirmadorPage;

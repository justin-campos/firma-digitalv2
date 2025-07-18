import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextFieldGeneral } from "@/components/text-field-general";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { useSnackbar } from "notistack";
import Firma from "@/components/firma/firma";
import { ButtonGeneral } from "@/components/button-general/button-general";
import { obtenerMedicoPorCodigoMinsa, MinsaResponse } from "@/utils/api/minsa";
import axios from 'axios';

import {
    Container,
    Paper,
    Typography,
    Box,
} from "@mui/material";

interface FormValues {
    codigo: string;
}

export default function FormularioWizard() {
    const { enqueueSnackbar } = useSnackbar();
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: { codigo: "" },
    });
    const [codigoMinsaGuardado, setCodigoMinsaGuardado] = useState<string>("");
    const [medico, setMedico] = useState<MinsaResponse | null>(null);
    const [firmaDibujada, setFirmaDibujada] = useState<string | null>(null);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const resultado = await obtenerMedicoPorCodigoMinsa(data.codigo.trim());
            if (!resultado) {
                enqueueSnackbar("No se encontró el médico con ese código", { variant: "error" });
                return;
            }
            setMedico(resultado);
            setCodigoMinsaGuardado(data.codigo.trim());
            enqueueSnackbar("Médico encontrado", { variant: "success" });
        } catch {
            enqueueSnackbar("Error al consultar el servicio", { variant: "error" });
        }
    };

    const manejadorMedico = async () => {
        if (!firmaDibujada || !medico) {
            enqueueSnackbar("Debe completar todos los campos y dibujar la firma", { variant: "warning" });
            return;
        }

        try {
            const medicoPayload = {
                codigoMinsa: codigoMinsaGuardado,
                nombre: medico.primerNombre,
                apellido: medico.primerApellido,
                categoria: medico?.titulos?.[0]?.descripcion ?? "",
                creadoPor: 1,
                creadoEnIp: "127.0.0.1",
            };

            const response = await axios.post("/api/medicos", medicoPayload);
            enqueueSnackbar(response.data?.mensaje ?? "Médico guardado correctamente", { variant: "success" });
        } catch (error: any) {
            enqueueSnackbar(error?.response?.data?.mensaje || "Ocurrió un error al guardar el médico", { variant: "error" });
        }
    };

    const paperStyle = {
        p: 4,
        borderTop: "3px solid #005da6",
        borderRadius: 2,
        boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
        background: "#eee",
        fontFamily: "tahoma, arial, verdana, sans-serif",
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h6" gutterBottom>Firma digital certificada</Typography>
            <Paper elevation={3} sx={paperStyle}>
                <Box mb={3} textAlign="center">
                    <Typography variant="h5" component="h1" color="#005da6" gutterBottom>
                        Validación de Código MINSA
                    </Typography>
                    <Typography variant="body1">
                        Por favor ingrese su código MINSA para continuar con la firma digital certificada.
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} mb={4}>
                    <TextFieldGeneral
                        control={control}
                        name="codigo"
                        label="Código MINSA"
                        required
                        error={errors.codigo}
                        fullWidth
                        showEndAdornment
                        endAdornmentIcon={
                            <IconButton
                                onClick={handleSubmit(onSubmit)}
                                sx={{ p: '10px' }}
                                aria-label="search"
                            >
                                <SearchIcon sx={{ color: '#005da6' }} />
                            </IconButton>
                        }
                    />
                </Box>

                {medico && (
                    <>
                        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} mb={3}>
                            <Box flex={1}>
                                <Typography variant="subtitle2" mb={1}>Primer nombre</Typography>
                                <TextFieldGeneral control={control} name="primer_nombre" label={medico.primerNombre} disabled showEndAdornment />
                            </Box>

                            <Box flex={1}>
                                <Typography variant="subtitle2" mb={1}>Primer apellido</Typography>
                                <TextFieldGeneral control={control} name="primer_apellido" label={medico.primerApellido} disabled showEndAdornment />
                            </Box>

                            <Box flex={1}>
                                <Typography variant="subtitle2" mb={1}>Categoría</Typography>
                                <TextFieldGeneral control={control} name="categoria" label={medico.titulos?.[0]?.descripcion ?? ""} disabled showEndAdornment />
                            </Box>
                        </Box>

                        <Box sx={{ mt: 3 }}>
                            <Firma onSave={setFirmaDibujada} />
                        </Box>

                        <Box display="flex" justifyContent="center" mt={2}>
                            <ButtonGeneral
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />}
                                disabled={!firmaDibujada}
                                sx={{
                                    backgroundColor: '#005799',
                                    '&:hover': { backgroundColor: '#004a85' },
                                }}
                                onClick={manejadorMedico}
                            >
                                Guardar Firma Certificada
                            </ButtonGeneral>
                        </Box>
                    </>
                )}
            </Paper>
        </Container>
    );
}

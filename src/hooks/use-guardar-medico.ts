import axios from "axios";
import { useSnackbar } from "notistack";

function useGuardarMedico() {
    const { enqueueSnackbar } = useSnackbar();

    const guardarMedico = async (datosMedico: any) => {
        try {
            const response = await axios.post("/api/medicos", datosMedico);
            enqueueSnackbar("Médico guardado exitosamente", { variant: "success" });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    enqueueSnackbar(error.response.data.error || "Error desconocido", { variant: "error" });
                } else if (error.request) {
                    enqueueSnackbar("No se recibió respuesta del servidor", { variant: "warning" });
                } else {
                    enqueueSnackbar("Error en la solicitud: " + error.message, { variant: "error" });
                }
            } else {
                enqueueSnackbar("Error inesperado", { variant: "error" });
            }
            return null;
        }
    };

    return { guardarMedico };
}

export default useGuardarMedico;

import {
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Fade,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useStore } from "@/store";
import CloseIcon from "@mui/icons-material/Close";

const tipoColor: Record<string, string> = {
  success: "#d1fae5",
  error: "#fee2e2",
  warning: "#fef9c3",
  info: "#cffafe",
};

const tipoColorBarra: Record<string, string> = {
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e42",
  info: "#06b6d4",
};

interface MensajeProps {
  duracion?: number;
}

export const Mensaje = ({ duracion = 10000 }: MensajeProps) => {
  const mensaje = useStore((state) => state.mensaje);
  const tipo = useStore((state) => state.tipo);
  const onClose = useStore((state) => state.clearMensaje);

  const [progress, setProgress] = useState(100);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible || tipo === "error") return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          setVisible(false);
          onClose?.();
          return 0;
        }
        return prev - 100 / (duracion / 100);
      });
    }, 100);
    return () => clearInterval(interval);
  }, [duracion, onClose, visible, tipo]);

  useEffect(() => {
    setVisible(true);
    setProgress(100);
  }, [mensaje, tipo]);

  if (!mensaje || !visible) return null;

  return (
    <Fade in={visible}>
      <Card
        sx={{
          mb: 4,
          position: "relative",
          overflow: "visible",
          bgcolor: tipoColor[tipo],
          // maxWidth: 420,
          mx: "auto",
          boxShadow: 3,
        }}
      >
        <LinearProgress
          variant="determinate"
          value={tipo === "error" ? 0 : progress}
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: 4,
            borderRadius: 2,
            bgcolor: tipoColorBarra[tipo],
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            p: { xs: 2, sm: 3 },
          }}
        >
          <IconButton
            aria-label="cerrar"
            onClick={() => {
              setVisible(false);
              onClose?.();
            }}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "grey.700",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            color="text.primary"
            sx={{ mb: 1, textAlign: "center", width: "100%" }}
          >
            {tipo === "success"
              ? "Éxito"
              : tipo === "error"
                ? "Error"
                : tipo === "warning"
                  ? "Advertencia"
                  : "Información"}
          </Typography>
          <Typography
            variant="subtitle1"
            // color="text.secondary"
            sx={{
              textAlign: "center",
              fontWeight: 500,
              wordBreak: "break-word",
              fontSize: { xs: 15, sm: 17 },
              width: "100%",
            }}
          >
            {mensaje}
          </Typography>
        </CardContent>
      </Card>
    </Fade>
  );
};

import {
  Stack,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Calendar, Clock, LogOut } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import { useSnackbar } from "notistack";

export const FechaAnimacion = () => {
  const [now, setNow] = useState(new Date());
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const setPersonaId = useStore((s) => s.setPersonaId);

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    setOpen(false);
    await fetch("/api/registro/logout", { method: "POST" });
    setPersonaId(null);
    router.push("/registro");
    enqueueSnackbar("Cierre de Sesion", { variant: "success" });
  };
  return (
    <Stack direction="row" spacing={1}>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Calendar style={{ color: "#fdfafa" }} size={18} />
        <Typography sx={{ color: "#fdfafa" }} variant="body2">
          {format(now, "dd/MM/yyyy", { locale: es })}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Clock style={{ color: "#fdfafa" }} size={18} />
        <Typography sx={{ color: "#fdfafa" }} variant="body2">
          {format(now, "hh:mma", { locale: es })}
        </Typography>
      </Stack>
      <Button
        onClick={() => setOpen(true)}
        sx={{ minWidth: 0, p: 0, color: "#fdfafa" }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <LogOut style={{ color: "#fdfafa" }} size={18} />
          <Typography sx={{ color: "#fdfafa" }} variant="body2">
            Salir
          </Typography>
        </Stack>
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>¿Desea cerrar sesión?</DialogTitle>
        <DialogContent>
          <Typography>Confirme que desea cerrar su sesión actual.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleLogout} color="error" variant="contained">
            Cerrar sesión
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

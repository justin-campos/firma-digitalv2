import {
  differenceInCalendarDays,
  isSameDay,
  parseISO,
  format,
} from "date-fns";

export const getFechaTexto = (fecha: string, hora: string) => {
  if (!fecha) return "--";
  const fechaConsulta = parseISO(fecha);
  const hoy = new Date();
  const diff = differenceInCalendarDays(fechaConsulta, hoy);

  if (isSameDay(fechaConsulta, hoy)) {
    return `Hoy - ${format(fechaConsulta, "dd/MM/yyyy")}, ${hora}`;
  }
  if (diff > 0 && diff <= 7) {
    return `En ${diff} día${diff > 1 ? "s" : ""} ${format(fechaConsulta, "dd/MM/yyyy")}, ${hora}`;
  }
  if (diff < 0 && diff >= -7) {
    return `Hace ${Math.abs(diff)} día${Math.abs(diff) > 1 ? "s" : ""} ${format(fechaConsulta, "dd/MM/yyyy")}, ${hora}`;
  }
  return `${format(fechaConsulta, "dd/MM/yyyy")}, ${hora}`;
};

import { StateCreator } from "zustand";

export type MensajeTipo = "success" | "error" | "warning" | "info";

export interface MensajeState {
  mensaje: string | null;
  tipo: MensajeTipo;
  visible: boolean;
  setMensaje: (mensaje: string, tipo?: MensajeTipo) => void;
  clearMensaje: () => void;
}

export const createMensajeSlice: StateCreator<MensajeState> = (set) => ({
  mensaje: null,
  tipo: "info",
  visible: false,
  setMensaje: (mensaje, tipo = "info") => set({ mensaje, tipo, visible: true }),
  clearMensaje: () => set({ mensaje: null, visible: false }),
});

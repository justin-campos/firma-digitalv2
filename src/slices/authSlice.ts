import { StateCreator } from "zustand/index";

export interface AuthSlice {
  persona_id: number | null;
  setPersonaId: (mensaje: number | null) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  persona_id: null,
  setPersonaId: (persona_id) => set({ persona_id }),
});

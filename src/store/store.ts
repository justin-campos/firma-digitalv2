import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createAuthSlice, AuthSlice } from "@/slices";
import { createMensajeSlice, MensajeState } from "@/slices/mensajeSlice";

type StoreState = AuthSlice & MensajeState;

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createMensajeSlice(...a),
    }),
    {
      name: "site-portal-pacientes-store",
    },
  ),
);

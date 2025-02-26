import { create } from "zustand";
import { RoleType } from "@/types";

interface AuthState {
  role: RoleType | null;
  setRole: (role: RoleType) => void;
  organisationId: string | null;
  setOrganisationId: (organisationId: string) => void;
}

export const useAuth = create<AuthState>(set => ({
  role: null,
  setRole: (role: RoleType) => {
    set({ role });
  },
  organisationId: null,
  setOrganisationId: (organisationId: string) => {
    set({ organisationId });
  },
  reset: () =>
    set({
      role: null,
      organisationId: null
    })
}));

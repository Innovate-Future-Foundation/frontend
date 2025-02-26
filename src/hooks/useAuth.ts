import { create } from "zustand";
import { RoleType } from "@/types";

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  role: RoleType | null;
  setRole: (role: RoleType) => void;
  organisationId: string | null;
  setOrganisationId: (organisationId: string) => void;
}

export const useAuth = create<AuthState>(set => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {
    set({ isAuthenticated });
  },
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
      organisationId: null,
      isAuthenticated: false
    })
}));

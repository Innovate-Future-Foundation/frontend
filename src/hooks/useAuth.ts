import { create } from "zustand";
import { RoleType } from "@/types";

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  role?: RoleType;
  setRole: (role: RoleType) => void;
  organisationId?: string;
  setOrganisationId: (organisationId: string) => void;
}

export const useAuth = create<AuthState>(set => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {
    set({ isAuthenticated });
  },
  role: undefined,
  setRole: (role: RoleType) => {
    set({ role });
  },
  organisationId: undefined,
  setOrganisationId: (organisationId: string) => {
    set({ organisationId });
  },
  reset: () =>
    set({
      role: undefined,
      organisationId: undefined,
      isAuthenticated: false
    })
}));

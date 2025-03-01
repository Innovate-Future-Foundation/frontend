import { create } from "zustand";
import { Organisation, ProfileInfo, RoleType } from "@/types";

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  role: RoleType | null;
  setRole: (role: RoleType | null) => void;
  organisationId: string | null;
  setOrganisationId: (organisationId: string | null) => void;
  userProfile: ProfileInfo | null;
  setUserProfile: (userProfile: ProfileInfo | null) => void;
  organisaitonProfile: Organisation | null;
  setOrganisation: (organisaitonProfile: Organisation | null) => void;
  resetAuthStore: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {
    set({ isAuthenticated });
  },
  role: null,
  setRole: (role: RoleType | null) => {
    set({ role });
  },
  organisationId: null,
  setOrganisationId: (organisationId: string | null) => {
    set({ organisationId });
  },
  userProfile: null,
  setUserProfile: (userProfile: ProfileInfo | null) => {
    set({ userProfile });
  },
  organisaitonProfile: null,
  setOrganisation: (organisaitonProfile: Organisation | null) => {
    set({ organisaitonProfile });
  },
  resetAuthStore: () =>
    set({
      role: null,
      organisationId: null,
      isAuthenticated: false,
      userProfile: null,
      organisaitonProfile: null
    })
}));

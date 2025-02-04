import { create } from "zustand";
import { RoleType } from "@/types";

interface AuthState {
  role: RoleType;
  setRole: (role: RoleType) => void;
  organisationId: string;
  setOrganisationId: (organisationId: string) => void;
}

export const useAuth = create<AuthState>(set => ({
  role: "organisation admin",
  setRole: (role: RoleType) => {
    console.log("Setting role to:", role);
    set({ role });
  },
  organisationId: "d96e643e-a7aa-42b0-a8cd-1cdd8610e857",
  setOrganisationId: (organisationId: string) => {
    console.log("Setting organisationId to:", organisationId);
    set({ organisationId });
  }
}));

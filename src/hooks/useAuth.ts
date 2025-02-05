import { create } from "zustand";
import { RoleType } from "@/types";

interface AuthState {
  role: RoleType;
  setRole: (role: RoleType) => void;
  organisationId: string;
  setOrganisationId: (organisationId: string) => void;
}

export const useAuth = create<AuthState>(set => ({
  role: "platform admin", //todo: hard code, will refactor later
  setRole: (role: RoleType) => {
    console.log("Setting role to:", role);
    set({ role });
  },
  organisationId: "", //todo: platform admin has no organisationId
  setOrganisationId: (organisationId: string) => {
    console.log("Setting organisationId to:", organisationId);
    set({ organisationId });
  }
}));

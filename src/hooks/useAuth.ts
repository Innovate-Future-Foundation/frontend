import { create } from "zustand";
import { RoleType } from "@/types";

interface AuthState {
  role: RoleType;
  setRole: (role: RoleType) => void;
  organisationId: string;
  setOrganisationId: (organisationId: string) => void;
}

export const useAuth = create<AuthState>(set => ({
  role: "OrgAdmin", //todo: hard code, will refactor later
  setRole: (role: RoleType) => {
    console.log("Setting role to:", role);
    set({ role });
  },
  organisationId: "06b396ba-6a47-40c1-b05f-097e032571f5", //todo: PlatformAdmin has no organisationId
  setOrganisationId: (organisationId: string) => {
    console.log("Setting organisationId to:", organisationId);
    set({ organisationId });
  }
}));

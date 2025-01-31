import { create } from "zustand";
import { RoleType } from "@/types";

interface AuthState {
  role: RoleType;
  setRole: (role: RoleType) => void;
}

export const useAuth = create<AuthState>(set => ({
  role: "platform admin",
  setRole: (role: RoleType) => {
    console.log("Setting role to:", role);
    set({ role });
  }
}));

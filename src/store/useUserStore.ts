import { create } from "zustand";
import { Organisation, ProfileInfo, RoleType } from "@/types";

interface UserState {
  role: RoleType | null;
  setRole: (role: RoleType | null) => void;
  userProfile: ProfileInfo | null;
  setUserProfile: (userProfile: ProfileInfo | null) => void;
  organisaitonProfile: Organisation | null;
  setOrganisation: (organisaitonProfile: Organisation | null) => void;
  resetUserStore: () => void;
}

export const useUserStore = create<UserState>(set => ({
  role: null,
  setRole: (role: RoleType | null) => {
    set({ role });
  },
  userProfile: null,
  setUserProfile: (userProfile: ProfileInfo | null) => {
    set({ userProfile });
  },
  organisaitonProfile: null,
  setOrganisation: (organisaitonProfile: Organisation | null) => {
    set({ organisaitonProfile });
  },
  resetUserStore: () =>
    set({
      role: null,
      userProfile: null,
      organisaitonProfile: null
    })
}));

import { Organisation } from "./organisation";

export interface Profile {
  profileId?: string;
  orgId?: string;
  org?: Organisation;
  roleId?: string;
  roleName?: string;
  invitedById?: string | null;
  invitedBy?: Profile | null;
  supervisedId?: string | null;
  supervisedBy?: Profile | null;
  name: string;
  email: string;
  phone: string | null;
  avatarLink: string | null;
  status?: ProfileStatus;
  createdAt?: string;
  updatedAt?: string;
}

type ProfileStatus = "active" | "suspended";

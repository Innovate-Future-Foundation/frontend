import { Organisation } from "./organisation";
import { RoleType } from "./role";

export interface Profile {
  profileId?: string;
  orgId?: string;
  org?: Organisation;
  roleId?: string;
  role?: RoleType;
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

export type ProfileStatus = "active" | "suspended";

export type ProfilePathType = "users" | "orgadmins" | "orgteachers" | "parents" | "students";

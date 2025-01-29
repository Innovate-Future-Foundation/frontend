import { Organisation } from "./organisation";
import { RoleType } from "./role";

export interface Profile extends ProfileInfo {
  profileId?: string;
  orgId?: string;
  org?: Organisation;
  roleId?: string;
  invitedById?: string | null;
  invitedBy?: Profile | null;
  supervisedId?: string | null;
  supervisedBy?: Profile | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfileInfo {
  role: RoleType;
  name: string;
  email: string;
  phone: string | null;
  avatarLink: string | null;
  status: ProfileStatus;
}

export type ProfileStatus = "active" | "suspended";

export type ProfilePathType = "users" | "orgadmins" | "orgmanagers" | "orgteachers" | "parents" | "students";

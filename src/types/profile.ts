import { OffsetPaginatedRequest } from "./apiReqResponse";
import { Organisation } from "./organisation";
import { RoleType } from "./role";

export interface Profile extends ProfileInfo {
  organisation?: Organisation;
  roleName?: RoleType;
  inviterProfile?: ProfileInfo | null;
  supervisorProfile?: ProfileInfo | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfileInfo {
  profileId?: string;
  orgId?: string;
  roleId?: string;
  inviter?: string | null;
  supervisor?: string | null;
  name?: string;
  email?: string;
  phone?: string | null;
  avatarUrl?: string | null;
  isActive?: boolean;
  isConfirmed?: boolean;
}

export type ProfilePathType = "users" | "orgadmins" | "orgmanagers" | "orgteachers" | "parents" | "students";

export interface ProfilePaginatedRequest extends OffsetPaginatedRequest {
  filters?: ProfilePaginationFilter;
  sortings?: ProfilePaginationOrderBy[];
}
export interface ProfilePaginationFilter {
  nameOrEmailOrPhone?: string;
  roleIds?: string;
  orgId?: string;
  isActive?: boolean;
  isConfirmed?: boolean;
}

export type ProfilePaginationOrderByType = "name" | "createdAt" | "updatedAt";

export interface ProfilePaginationOrderBy {
  orderBy: ProfilePaginationOrderByType;
  isAscending: boolean;
}

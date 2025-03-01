import { OffsetPaginatedRequest } from "./apiReqResponse";
import { Organisation } from "./organisation";

export interface Profile extends ProfileInfo {
  organisation?: Organisation;
  inviterProfile?: ProfileInfo | null;
  supervisorProfile?: ProfileInfo | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfileInfo {
  id?: string;
  orgId?: string;
  roleCode?: RoleType;
  inviter?: string | null;
  supervisor?: string | null;
  name?: string;
  email?: string;
  phone?: string | null;
  avatarUrl?: string | null;
  isActive?: boolean;
  isConfirmed?: boolean;
}

export interface PermissionTypes {
  canEditOrganisationDetailForm: RoleType[];
  canViewManagerScrollList: RoleType[];
  needViewOrganisationOfUser: RoleType[];
}

export type RoleType = "UndefinedRole" | "PlatformAdmin" | "OrgAdmin" | "OrgManager" | "OrgTeacher" | "Parent" | "Student";

export type ProfilePathType = "contacts" | "orgadmins" | "orgmanagers" | "orgteachers" | "parents" | "students";

export interface ProfilePaginatedRequest extends OffsetPaginatedRequest {
  filters?: ProfilePaginationFilter;
  sortings?: ProfilePaginationOrderBy[];
}
export interface ProfilePaginationFilter {
  roleCodes?: string;
  orgId?: string;
  isActive?: boolean;
  isConfirmed?: boolean;
}

export type ProfilePaginationOrderByType = "name" | "createdAt" | "updatedAt";

export interface ProfilePaginationOrderBy {
  orderBy: ProfilePaginationOrderByType;
  isAscending: boolean;
}

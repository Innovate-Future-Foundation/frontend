import { RoleType } from "@/types";

export interface PermissionMap {
  canViewOrganisationProfile: RoleType[];
  canEditOrganisationProfile: RoleType[];
  canViewAdminList: RoleType[];
  canManageAdminList: RoleType[];
}

export const defaultPermissionMap: PermissionMap = {
  canViewOrganisationProfile: ["platform admin", "organisation admin", "organisation manager", "organisation teacher", "parent", "student"],
  canEditOrganisationProfile: ["platform admin", "organisation admin", "organisation manager"],
  canViewAdminList: ["platform admin", "organisation admin"],
  canManageAdminList: ["platform admin", "organisation admin"]
};

export function checkPermission(role: RoleType, permission: keyof PermissionMap): boolean {
  return defaultPermissionMap[permission].includes(role);
}

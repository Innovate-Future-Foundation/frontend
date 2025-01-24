import { checkPermission, PermissionMap } from "@/constants/permissions";
import { useAuth } from "./use-auth";

export function usePermissions() {
  const { role } = useAuth();
  console.log("Current role in usePermissions:", role);

  const permissions = {
    checkPermission: (permission: keyof PermissionMap) => {
      const hasPermission = checkPermission(role, permission);
      console.log(`Permission check for ${permission}:`, hasPermission);
      return hasPermission;
    },
    canViewOrganisationProfile: ["platform admin", "organisation admin", "organisation manager", "organisation teacher", "parent", "student"].includes(role),
    canEditOrganisationProfile: ["platform admin", "organisation admin", "organisation manager"].includes(role),
    canViewAdminList: ["platform admin", "organisation admin"].includes(role),
    canManageAdminList: ["platform admin", "organisation admin"].includes(role),
    canManageTeachers: ["platform admin", "organisation admin", "organisation manager"].includes(role)
  };

  console.log("Calculated permissions:", permissions);
  return permissions;
}

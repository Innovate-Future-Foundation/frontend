import { checkPermission, PermissionMap } from "@/constants/permissions";
import { useAuth } from "./useAuth";

export function usePermissions() {
  const { role } = useAuth();
  console.log("Current role in usePermissions:", role);

  const permissions = {
    checkPermission: (permission: keyof PermissionMap) => {
      const hasPermission = checkPermission(role, permission);
      console.log(`Permission check for ${permission}:`, hasPermission);
      return hasPermission;
    },
    canEditOrganisationProfile: ["platform admin", "organisation admin"].includes(role),
    canViewManagerScrollList: ["platform admin", "organisation admin"].includes(role)
  };

  console.log("Calculated permissions:", permissions);
  return permissions;
}

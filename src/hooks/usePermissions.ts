import { useAuth } from "./useAuth";

export function usePermissions() {
  const { role } = useAuth();

  const permissions = {
    canEditOrganisationDetailForm: ["PlatformAdmin", "OrgAdmin"].includes(role!),
    canViewManagerScrollList: ["PlatformAdmin", "OrgAdmin"].includes(role!),
    needViewOrganisationOfUser: ["PlatformAdmin"].includes(role!)
  };

  return permissions;
}

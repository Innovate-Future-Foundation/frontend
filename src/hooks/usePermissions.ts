import { useAuth } from "./useAuth";

export function usePermissions() {
  const { role } = useAuth();
  console.log("Current role in usePermissions:", role);

  const permissions = {
    canEditOrganisationProfile: ["platform admin", "organisation admin"].includes(role),
    canViewManagerScrollList: ["platform admin", "organisation admin"].includes(role)
  };

  console.log("Calculated permissions:", permissions);
  return permissions;
}

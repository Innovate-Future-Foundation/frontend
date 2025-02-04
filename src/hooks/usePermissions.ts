import { useAuth } from "./useAuth";

export function usePermissions() {
  const { role } = useAuth();
  console.log("Current role in usePermissions:", role);

  const permissions = {
    canEditOrganisationProfile: ["platform admin", "organisation admin"].includes(role),
    canViewManagerScrollList: ["platform admin", "organisation admin"].includes(role),
    needViewOrganisationOfUser: ["platform admin"]
  };

  console.log("Calculated permissions:", permissions);
  return permissions;
}

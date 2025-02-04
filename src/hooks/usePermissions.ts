import { useAuth } from "./useAuth";

export function usePermissions() {
  const { role } = useAuth();

  const permissions = {
    canEditOrganisationProfile: ["platform admin", "organisation admin"].includes(role),
    canViewManagerScrollList: ["platform admin", "organisation admin"].includes(role),
<<<<<<< HEAD
    needViewOrganisationOfUser: ["platform admin"].includes(role)
=======
    needViewOrganisationOfUser: ["platform admin"]
>>>>>>> 52b4503 (feat: add profile apis)
  };

  return permissions;
}

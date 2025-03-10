import { useUserStore } from "@/store";

export function usePermissions() {
  const { role } = useUserStore();

  const permissions = {
    canEditOrganisationDetailForm: ["PlatformAdmin", "OrgAdmin"].includes(role!),
    canViewManagerScrollList: ["PlatformAdmin", "OrgAdmin"].includes(role!),
    needViewOrganisationOfUser: ["PlatformAdmin"].includes(role!)
  };

  return permissions;
}

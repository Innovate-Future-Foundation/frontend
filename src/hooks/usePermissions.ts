import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { profiles } from "@/queries/profiles";
import { keepPreviousData } from "@tanstack/react-query";

export function usePermissions() {
  const { role } = useAuthStore();

  const { data: permissionsData } = useQuery({
    ...profiles.permissionslist(),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false
  });

  const permissionsList = !Array.isArray(permissionsData?.data) ? permissionsData?.data : permissionsData?.data[0];

  const permissions = {
    canEditOrganisationDetailForm: permissionsList?.canEditOrganisationDetailForm.includes(role!),
    canViewManagerScrollList: permissionsList?.canEditOrganisationDetailForm.includes(role!),
    needViewOrganisationOfUser: permissionsList?.canEditOrganisationDetailForm.includes(role!)
  };

  return permissions;
}

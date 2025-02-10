import { createQueryKeys } from "@lukemorales/query-key-factory";
import { ApiResponse, Profile, ProfilePaginatedRequest } from "@/types";
import { profileApis } from "@/services/apiServices";
import { convertToQueryParams } from "@/utils/formatters";

export const profiles = createQueryKeys("profiles", {
  all: null,

  detail: (id: string) => ({
    queryKey: [id],
    queryFn: async () => {
      const response = await profileApis.getProfileByIdWithDetail(id);
      return response.data as ApiResponse<Profile>;
    }
  }),
  orgAdminslist: (params: ProfilePaginatedRequest) => ({
    queryKey: [{ params }],
    queryFn: async () => {
      const response = await profileApis.getOrgAdmins(convertToQueryParams(params));
      return response.data as ApiResponse<Profile>;
    }
  }),
  orgManagerslist: (params: ProfilePaginatedRequest, organisationId: string) => ({
    queryKey: [{ params }],
    queryFn: async () => {
      const response = await profileApis.getOrgManagers(convertToQueryParams(params), organisationId);
      return response.data as ApiResponse<Profile>;
    }
  }),
  orgTeacherslist: (params: ProfilePaginatedRequest, organisationId: string) => ({
    queryKey: [{ params }],
    queryFn: async () => {
      const response = await profileApis.getOrgTeachers(convertToQueryParams(params), organisationId);
      return response.data as ApiResponse<Profile>;
    }
  }),
  parentslist: (params: ProfilePaginatedRequest, organisationId: string) => ({
    queryKey: [{ params }],
    queryFn: async () => {
      const response = await profileApis.getParents(convertToQueryParams(params), organisationId);
      return response.data as ApiResponse<Profile>;
    }
  }),
  childrenlist: (params: ProfilePaginatedRequest, parents: Profile[]) => ({
    queryKey: ["children", parents.map(p => p.id).join(",")],
    queryFn: async () => {
      const results = await Promise.all(
        parents.map(async Parent => {
          const response = await profileApis.getStudentsByParentId(convertToQueryParams(params), Parent.id ?? "");
          return Array.isArray((response.data as ApiResponse<Profile>).data) ? (response.data as ApiResponse<Profile>).data : [];
        })
      );
      return results;
    }
  }),
  studentslist: (params: ProfilePaginatedRequest, organisationId: string) => ({
    queryKey: [{ params }],
    queryFn: async () => {
      const response = await profileApis.getStudents(convertToQueryParams(params), organisationId);
      return response.data as ApiResponse<Profile>;
    }
  })
});

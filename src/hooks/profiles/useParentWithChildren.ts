import { useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { Profile, ProfilePaginatedRequest, TableBaseType } from "@/types";
import { useMemo } from "react";
import { profiles } from "@/queries/profiles";
import { useUserStore } from "@/store";

export const useParentWithChildren = (profilePaginatedRequest: ProfilePaginatedRequest) => {
  const { organisaitonProfile } = useUserStore();
  const errorTitleChildren = ERROR_MESSAGES.FAIL_TO_FETCH_CHILDREN;
  const errorTitleParent = ERROR_MESSAGES.FAIL_TO_FETCH_PARENT;

  const {
    data: parentsResponse,
    isLoading: isLoadingParents,
    error: errorParents,
    isError: isErrorParents
  } = useQuery({
    ...profiles.parentslist(profilePaginatedRequest, organisaitonProfile?.id ?? ""),
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!profilePaginatedRequest.limit
  });

  useErrorNotification(isErrorParents, errorTitleParent, errorParents);

  const totalItems = useMemo(() => parentsResponse?.meta?.totalItems ?? 0, [parentsResponse]);

  const parentsData: TableBaseType<Profile>[] = useMemo(() => {
    return Array.isArray(parentsResponse?.data) ? parentsResponse?.data : [];
  }, [parentsResponse]);

  const {
    data: childrenResponse,
    error: errorChildren,
    isLoading: isLoadingChildren,
    isError: isErrorChildren
  } = useQuery({
    ...profiles.childrenlist(parentsData),
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!parentsResponse && parentsData.length > 0
  });

  const childrenData: TableBaseType<Profile>[] = useMemo(() => {
    return Array.isArray(childrenResponse?.data) ? childrenResponse?.data : [];
  }, [childrenResponse]);

  parentsData.forEach(p => {
    p.children = childrenData ? (childrenData.filter(child => child.supervisorProfile?.id === p.id) ?? []) : [];
  });

  useErrorNotification(isErrorChildren, errorTitleChildren, errorChildren);

  return { totalItems, parentsData, isLoadingParents, isLoadingChildren, isErrorParents, errorParents };
};

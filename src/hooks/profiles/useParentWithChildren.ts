import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useErrorNotification } from "../useErrorNotification";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { Profile, ProfilePaginatedRequest, TableBaseType } from "@/types";
import { useAuth } from "../useAuth";
import { useMemo } from "react";
import { profiles } from "@/queries/profiles";

export const useParentWithChildren = (profilePaginatedRequest: ProfilePaginatedRequest) => {
  const { organisationId } = useAuth();
  const errorTitleChildren = ERROR_MESSAGES.FAIL_TO_FETCH_CHILDREN;
  const errorTitleParent = ERROR_MESSAGES.FAIL_TO_FETCH_PARENT;

  const {
    data: parentsResponse,
    isLoading: isLoadingParents,
    error: errorParents,
    isError: isErrorParents
  } = useQuery({
    ...profiles.parentslist(profilePaginatedRequest, organisationId),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!profilePaginatedRequest.limit
  });

  useErrorNotification(isErrorParents, errorTitleParent, errorParents);

  const totalItems = useMemo(() => parentsResponse?.meta?.totalItems ?? 0, [parentsResponse]);

  const parentsData: TableBaseType<Profile>[] = useMemo(() => {
    return Array.isArray(parentsResponse?.data) ? parentsResponse?.data : [{ isActive: true }];
  }, [parentsResponse]);

  const {
    data: childrenResponse,
    error: errorChildren,
    isError: isErrorChildren
  } = useQuery({
    ...profiles.childrenlist(profilePaginatedRequest, parentsData),
    placeholderData: keepPreviousData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!parentsData.length
  });

  parentsData.forEach((p, index) => {
    p.children = (childrenResponse ? (childrenResponse[index] ?? [{ isActive: true }]) : [{ isActive: true }]) as TableBaseType<Profile>[];
  });

  useErrorNotification(isErrorChildren, errorTitleChildren, errorChildren);

  return { totalItems, parentsData, isLoadingParents, isErrorParents, errorParents };
};

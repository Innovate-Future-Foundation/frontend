import { OffsetPaginatedRequest } from "./apiReqResponse";

export interface Organisation {
  orgId?: string;
  orgName: string;
  logoUrl?: string | null;
  websiteUrl?: string | null;
  address?: Address | null;
  email?: string | null;
  subscription?: SubscriptionStatus | null;
  status?: OrganisationStatus;
  createdAt?: string;
  updatedAt?: string;
}
export interface Address {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
}

export enum SubscriptionStatus {
  Premium = 0,
  Free = 1,
  Basic = 2
}
export enum OrganisationStatus {
  Pending = 0,
  Verified = 1,
  Suspended = 2,
  Deactivated = 3
}
export interface OrganisationPaginatedRequest extends OffsetPaginatedRequest {
  filters?: OrganisationPaginationFilter;
  sortings?: OrganisationPaginationOrderBy[];
}
export interface OrganisationPaginationFilter {
  orgNameOrEmail?: string;
  status?: OrganisationStatus;
  subscription?: SubscriptionStatus;
}

export type OrganisationPaginationOrderByType = "orgName" | "createdAt" | "updatedAt";

export interface OrganisationPaginationOrderBy {
  orderBy: OrganisationPaginationOrderByType;
  isAscending: boolean;
}

import { OffsetPaginatedRequest } from "./apiReqResponse";

export interface Organisation {
  id?: string;
  orgName?: string;
  logoUrl?: string | null;
  websiteUrl?: string | null;
  address?: Address | null;
  email?: string | null;
  subscriptionCode?: SubscriptionCode | null;
  orgStatusCode?: OrgStatusCode;
  createdAt?: string;
  updatedAt?: string;
}
export interface Address {
  street: string;
  suburb: string;
  state: string;
  postCode: string;
  country: string;
}
export type OrgStatusCode = "UndefinedOrgStatus" | "Pending" | "Active" | "Suspended";
export type SubscriptionCode = "UndefinedSubscription" | "Premium" | "Free" | "Basic";
export interface OrganisationPaginatedRequest extends OffsetPaginatedRequest {
  filters?: OrganisationPaginationFilter;
  sortings?: OrganisationPaginationOrderBy[];
}
export interface OrganisationPaginationFilter {
  orgStatusCode?: OrgStatusCode;
  subscriptionCode?: SubscriptionCode;
}

export type OrganisationPaginationOrderByType = "orgName" | "createdAt" | "updatedAt";

export interface OrganisationPaginationOrderBy {
  orderBy: OrganisationPaginationOrderByType;
  isAscending: boolean;
}

import { OffsetPaginatedRequest } from "./apiReqResponse";

export interface Organisation {
  orgId?: string;
  orgName: string;
  logoUrl?: string | null;
  websiteUrl?: string | null;
  address?: Address | null;
  email?: string | null;
  subscription?: Subscription | null;
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
export type Subscription = "premium" | "free" | "basic";
export type OrganisationStatus = "pending" | "verified" | "suspended" | "deactivated";

export interface OrganisationPaginatedRequest extends OffsetPaginatedRequest {
  filters: OrganisationPaginationFilter;
  orderBy: OrganisationPaginationOrderBy;
}
export interface OrganisationPaginationFilter {
  orgName?: string;
  email?: string;
  status?: string;
  subscription?: string;
}

export type OrganisationPaginationOrderBy = "OrgName" | "CreatedAt" | "UpdatedAt";

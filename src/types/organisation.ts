export interface OrganisationFormType {
  orgName: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  address: Address | null;
  email: string | null;
  subscription: string | null;
  status: OrganisationStatus;
}
export interface OrganisationType extends OrganisationFormType {
  orgId: string;
  createdAt: string;
  updatedAt: string;
}
export type Address = {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
};

export type OrganisationStatus = "pending" | "verified" | "suspended" | "deactivated";

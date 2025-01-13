export type OrganisationType = {
  orgId: string;
  orgName: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  address: string | null;
  email: string | null;
  subscription: string | null;
  status: OrganisationStatus;
  createdAt: string;
  updatedAt: string;
};

export type OrganisationStatus = "pending" | "verified" | "suspended" | "deactivated";

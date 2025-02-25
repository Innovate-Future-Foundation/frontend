import { Address } from "./organisation";

export interface RegisterOrgWithAdminCredentials {
  orgName: string;
  orgEmail: string;
  address?: Address | null;
  logoUrl?: string | null;
  websiteUrl?: string | null;
  // org admin info
  userName: string;
  userEmail: string;
  password: string;
}

export interface LoginCredential {
  email: string;
  password: string;
}

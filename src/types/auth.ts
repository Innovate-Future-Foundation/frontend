import { Address } from "./organisation";
import { Profile, RoleType } from "./profile";

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

export interface EmailVerificationCredential {
  email: string;
  token: string;
  profileId: string;
}
export interface ResendEmailCredential {
  email: string;
}
export interface ForgotPasswordCredential {
  email: string;
}
export interface InviteUserCredential {
  email: string;
  name: string;
  roleCode: RoleType;
}

export interface LoginCredential {
  email: string;
  password: string;
}
export interface ResetPasswordCredential {
  resetPasswordToken: string;
  email: string;
  newPassword: string;
}
export interface MyInfo {
  id: string;
  name: string;
  email: string;
  defaultProfile: Profile;
}

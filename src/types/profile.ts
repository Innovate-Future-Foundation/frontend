export interface Profile {
  profileId?: string;
  orgId?: string;
  roleId?: string;
  invitedBy?: string;
  supervisedBy?: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  avatarLink: string | null;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

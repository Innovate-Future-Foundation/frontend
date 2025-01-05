export interface inviteType {
  email: string;
  fullName: string;
  roleId: string;
  orgId: string;
}
export interface inviteInfoType extends inviteType {
  invitedBy: string | null;
  supervisedBy: string | null;
}

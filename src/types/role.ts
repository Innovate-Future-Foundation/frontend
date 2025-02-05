export interface Role {
  roleId?: string;
  name: RoleType;
  codeName: string;
  description?: string | null;
}

export type RoleType = "platform admin" | "organisation admin" | "organisation manager" | "organisation teacher" | "parent" | "student";

export interface Role {
  roleId?: string;
  name: RoleType;
  codeName: string;
  description?: string | null;
}

export type RoleType = "user" | "platform admin" | "organisation manager" | "organisation admin" | "organisation teacher" | "parent" | "student";

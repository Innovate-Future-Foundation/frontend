export interface Role {
  roleId?: string;
  name: RoleType;
  codeName: string;
  description?: string | null;
}

export type RoleType = "organisation stuff" | "platform admin" | "organisation admin" | "organisation teacher" | "parent" | "student";

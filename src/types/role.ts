export interface Role {
  roleId?: string;
  name: RoleType;
  codeName: string;
  description?: string | null;
}

export type RoleType = "PlatformAdmin" | "OrgAdmin" | "OrgManager" | "OrgTeacher" | "Parent" | "Student";

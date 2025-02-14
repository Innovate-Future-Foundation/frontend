import { RoleType } from "@/types";

export const APP_NAME = "@InnovateFuture";
export const DEFAULT_LANGUAGE = "en";
export const ITEMS_PER_PAGE = 8;
export const DEBOUNCE_TIME_MS = 500;

export const CONTACT_ACCESS: Record<RoleType, RoleType[]> = {
  PlatformAdmin: ["OrgAdmin", "OrgManager", "OrgTeacher", "Parent", "Student"],
  OrgAdmin: ["OrgManager", "OrgTeacher", "Parent", "Student"],
  OrgManager: ["OrgAdmin", "OrgManager", "OrgTeacher", "Parent", "Student"],
  OrgTeacher: ["OrgAdmin", "OrgManager", "OrgTeacher", "Parent", "Student"],
  Parent: ["OrgTeacher", "Student"],
  Student: ["OrgTeacher", "Student"],
  UndefinedRole: []
};

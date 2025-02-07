import { RoleType } from "@/types";

export const APP_NAME = "Innovate Future";
export const DEFAULT_LANGUAGE = "en";
export const ITEMS_PER_PAGE = 8;
export const DEBOUNCE_TIME_MS = 500;

export const ROLE_IDS: Record<RoleType, string> = {
  "organisation admin": "d378829839b44a409985bfa6a830acd9",
  "organisation manager": "3b69fda3555a4658a6ab31e1f327ef79",
  "organisation teacher": "32ef65363cb14846bd32cd34b489fd43",
  parent: "28c99a2ae59343538dc2cb83fc1ebfea",
  student: "64fe5f03b1c44b449894a89f5772a751",
  "platform admin": ""
};

export const CONTACT_ACCESS: Record<RoleType, RoleType[]> = {
  "platform admin": ["organisation admin", "organisation manager", "organisation teacher", "parent", "student"],
  "organisation admin": ["organisation manager", "organisation teacher", "parent", "student"],
  "organisation manager": ["organisation admin", "organisation manager", "organisation teacher", "parent", "student"],
  "organisation teacher": ["organisation admin", "organisation manager", "organisation teacher", "parent", "student"],
  parent: ["organisation teacher", "student"],
  student: ["organisation teacher", "student"]
};

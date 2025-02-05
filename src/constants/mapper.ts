import { OrganisationStatus, RoleType, SubscriptionStatus } from "@/types";
import { CONTACT_ACCESS, ROLE_IDS } from "./appConfig";

export const getFiltersItems: Record<string, string[] | Record<RoleType, string[]>> = {
  status: ["pending", "verified", "suspended", "deactivated"],
  subscription: ["premium", "free", "basic"],
  isActive: ["active", "suspended"],
  isConfirmed: ["accepted", "pending"],
  roleName: {
    "platform admin": CONTACT_ACCESS["platform admin"],
    "organisation admin": CONTACT_ACCESS["organisation admin"],
    "organisation manager": CONTACT_ACCESS["organisation manager"],
    "organisation teacher": CONTACT_ACCESS["organisation teacher"],
    parent: CONTACT_ACCESS["parent"],
    student: CONTACT_ACCESS["student"]
  }
};

export const getfilterTitle: Record<string, string> = {
  isActive: "status",
  isConfirmed: "invitation confirmation",
  status: "status",
  subscription: "subscription",
  roleName: "role"
};

export const mapStringToEnum = (id: string, value: string): [string, OrganisationStatus | SubscriptionStatus | undefined] => {
  if (id === "status") {
    return [id, OrganisationStatus[(value.charAt(0).toUpperCase() + value.slice(1)) as keyof typeof OrganisationStatus]];
  } else if (id === "subscription") {
    return [id, SubscriptionStatus[(value.charAt(0).toUpperCase() + value.slice(1)) as keyof typeof SubscriptionStatus]];
  }
  return [id, undefined];
};

export const mapStringToBoolean = (id: string, value: string): [string, boolean | undefined] => {
  if (id === "isActive") {
    return [id, value === "active"];
  } else if (id === "isConfirmed") {
    return [id, value === "accepted"];
  }
  return [id, undefined];
};

export const mapTypeToId = (id: string, value: string): [string, string | undefined] => {
  if (id === "roleName") {
    return ["roleIds", ROLE_IDS[value as RoleType]];
  }
  return ["roleIds", undefined];
};

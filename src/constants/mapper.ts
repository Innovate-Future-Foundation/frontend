import { OrgStatusCode, RoleType, SubscriptionCode } from "@/types";
import { CONTACT_ACCESS } from "./appConfig";

export const getFiltersItems: Record<string, string[] | Record<RoleType, string[]>> = {
  orgStatusCode: ["Pending", "Active", "Suspended"],
  subscriptionCode: ["Premium", "Free", "Basic"],
  isActive: ["Active", "Suspended"],
  isConfirmed: ["Accepted", "Pending"],
  roleCode: {
    PlatformAdmin: CONTACT_ACCESS["PlatformAdmin"],
    OrgAdmin: CONTACT_ACCESS["OrgAdmin"],
    OrgManager: CONTACT_ACCESS["OrgManager"],
    OrgTeacher: CONTACT_ACCESS["OrgTeacher"],
    Parent: CONTACT_ACCESS["Parent"],
    Student: CONTACT_ACCESS["Student"],
    UndefinedRole: CONTACT_ACCESS["UndefinedRole"]
  }
};

export const getfilterTitle: Record<string, string> = {
  isActive: "Account Status",
  isConfirmed: "Invitation Status",
  orgStatusCode: "Status",
  subscriptionCode: "Subscription",
  roleCode: "Role"
};

export const getColorStyleByRole: Record<RoleType, string> = {
  PlatformAdmin: "",
  OrgAdmin: "text-secondary-foreground bg-secondary",
  OrgManager: "text-secondary-foregroundRed bg-secondary-red",
  OrgTeacher: "text-secondary-foregroundYellow bg-secondary-yellow",
  Parent: "text-secondary-foregroundPurple bg-secondary-purple",
  Student: "text-secondary-foregroundGreen bg-secondary-green",
  UndefinedRole: ""
};

export const getColorStyleByIsActive = new Map<boolean, string>([
  [true, "text-secondary-foreground bg-secondary border-primary-light"],
  [false, "text-primary-foreground60 bg-muted"]
]);

export const getColorStyleByIsConfirmed = new Map<boolean, string>([
  [true, "text-secondary-foregroundGreen bg-secondary-green border-secondary-greenLight"],
  [false, "text-secondary-foregroundYellow bg-secondary-yellow border-secondary-yellowLight"]
]);

export const getImageBySubscription: Record<SubscriptionCode, string> = {
  Premium: "/assets/images/goldMedal.png",
  Basic: "/assets/images/silverMedal.png",
  Free: "/assets/images/copperMedal.png",
  UndefinedSubscription: ""
};
export const getColorStyleByStatus: Record<OrgStatusCode, string> = {
  Pending: "text-secondary-foregroundYellow bg-secondary-yellow border-secondary-yellowLight",
  Active: "text-secondary-foregroundGreen bg-secondary-green border-secondary-greenLight",
  Suspended: "text-primary-foreground60 bg-muted",
  UndefinedOrgStatus: ""
};

export const mapStringToBoolean = (id: string, value: string): [string, boolean | undefined] => {
  if (id === "isActive") {
    return [id, value === "Active"];
  } else if (id === "isConfirmed") {
    return [id, value === "Accepted"];
  }
  return [id, undefined];
};

export const mapStringToType = (id: string, value: string): [string, OrgStatusCode | SubscriptionCode | RoleType | undefined] => {
  if (id === "roleCode") {
    return ["roleCodes", value as RoleType];
  } else if (id === "orgStatusCode") {
    return [id, value as OrgStatusCode];
  } else if (id === "subscriptionCode") {
    return [id, value as SubscriptionCode];
  }
  return ["roleCodes", undefined];
};

export const mapRoleTypeToString: Record<RoleType, string> = {
  PlatformAdmin: "Platform Admin",
  OrgAdmin: "Admin",
  OrgManager: "Manager",
  OrgTeacher: "Teacher",
  Parent: "Parent",
  Student: "Student",
  UndefinedRole: ""
};

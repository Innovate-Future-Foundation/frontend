import { OrganisationStatus, SubscriptionStatus } from "@/types";

export const getFiltersItems: Record<string, string[]> = {
  status: ["pending", "verified", "suspended", "deactivated"],
  subscription: ["premium", "free", "basic"],
  isActive: ["active", "suspended"],
  isConfirmed: ["accepted", "pending"]
};

export const mapStringToEnum = (id: string, value: string): OrganisationStatus | SubscriptionStatus | undefined => {
  if (id === "status") {
    return OrganisationStatus[(value.charAt(0).toUpperCase() + value.slice(1)) as keyof typeof OrganisationStatus];
  } else if (id === "subscription") {
    return SubscriptionStatus[(value.charAt(0).toUpperCase() + value.slice(1)) as keyof typeof SubscriptionStatus];
  }
  return undefined;
};

export const getfilterTitle: Record<string, string> = {
  isActive: "status",
  isConfirmed: "invitation confirmation",
  status: "status",
  subscription: "subscription"
};

// export const mapStringToBoolean = (id: string, value: string): boolean =>{
//   if(id === ""){

//   }
// }

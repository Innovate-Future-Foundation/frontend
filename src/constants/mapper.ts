import { OrganisationStatus, SubscriptionStatus } from "@/types";

export const getFiltersItems: Record<string, string[]> = {
  status: ["pending", "verified", "suspended", "deactivated"],
  subscription: ["premium", "free", "basic"]
};

export const mapStringToEnum = (id: string, value: string): OrganisationStatus | SubscriptionStatus | undefined => {
  if (id === "status") {
    return OrganisationStatus[(value.charAt(0).toUpperCase() + value.slice(1)) as keyof typeof OrganisationStatus];
  } else if (id === "subscription") {
    return SubscriptionStatus[(value.charAt(0).toUpperCase() + value.slice(1)) as keyof typeof SubscriptionStatus];
  }
  return undefined;
};

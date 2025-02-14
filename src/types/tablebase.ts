import { Organisation } from "./organisation";
import { Profile } from "./profile";

export type TableBaseType<T extends object> = T & {
  children?: TableBaseType<T>[];
};
export type ProfileWithChildren = TableBaseType<Profile>;
export type OrganisationWithChildren = TableBaseType<Organisation>;

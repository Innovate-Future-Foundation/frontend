import { Profile, ProfileInfo, ProfileStatus, RoleType, TableBaseType } from "@/types";
import { faker } from "@faker-js/faker";
import { newOrganisation } from "./mockOrganisation";

export const newProfile = (role?: RoleType): TableBaseType<Profile> => {
  const roleName = role ?? faker.helpers.shuffle<RoleType>(["organisation manager", "organisation admin", "organisation teacher", "parent", "student"])[0];
  return {
    profileId: faker.string.uuid(),
    org: newOrganisation(),
    role: roleName,
    invitedBy: roleName === "organisation manager" ? null : newProfileInfo(),
    supervisedBy: roleName != "student" ? null : newProfileInfo("parent"),
    name: faker.person.fullName(),
    email: `${faker.person.fullName()}@gmail.com`,
    phone: faker.helpers.shuffle([`+61 45${faker.number.int({ min: 1000000, max: 9999999 })}`, null])[0],
    avatarLink: faker.helpers.shuffle([faker.image.avatar(), null])[0],
    status: faker.helpers.shuffle<ProfileStatus>(["active", "suspended"])[0],
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString()
  };
};

export const newProfileInfo = (role?: RoleType): TableBaseType<ProfileInfo> => {
  const roleName = role ?? faker.helpers.shuffle<RoleType>(["platform admin", "organisation manager", "organisation admin", "organisation teacher"])[0];
  return {
    role: roleName,
    name: faker.person.fullName(),
    email: `${faker.person.fullName()}@gmail.com`,
    phone: faker.helpers.shuffle([`+61 45${faker.number.int({ min: 1000000, max: 9999999 })}`, null])[0],
    avatarLink: faker.helpers.shuffle([faker.image.avatar(), null])[0],
    status: faker.helpers.shuffle<ProfileStatus>(["active", "suspended"])[0]
  };
};

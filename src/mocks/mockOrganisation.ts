import { Address, Organisation, OrganisationStatus, Subscription, TableBaseType } from "@/types";
import { faker, fakerEN_AU } from "@faker-js/faker";

export const newOrganisation = (): TableBaseType<Organisation> => {
  const orgName = faker.company.name();
  return {
    orgId: faker.string.uuid(),
    orgName: orgName,
    address: faker.helpers.shuffle([newAddress(), null])[0],
    email: `${orgName}@gmail.com`,
    subscription: faker.helpers.shuffle<Subscription | null>(["basic", "free", "premium", null])[0],
    status: faker.helpers.shuffle<OrganisationStatus>(["pending", "verified", "suspended", "deactivated"])[0],
    logoUrl: faker.helpers.shuffle([faker.image.avatar(), null])[0],
    websiteUrl: faker.helpers.shuffle([faker.internet.url(), null])[0],
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString()
  };
};

const newAddress = (): Address => {
  return {
    street: fakerEN_AU.location.streetAddress({ useFullAddress: true }),
    suburb: fakerEN_AU.location.city(),
    state: fakerEN_AU.location.state(),
    postcode: fakerEN_AU.location.zipCode(),
    country: "AU"
  };
};

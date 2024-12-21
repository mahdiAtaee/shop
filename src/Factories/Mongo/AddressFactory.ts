import { faker } from "@faker-js/faker/.";
import IAddress from "src/components/users/model/IAddress";

export async function createAddress(
  count: number = 1,
  params?: Partial<IAddress>
) {
  const addresses: Partial<IAddress>[] = [];
  for (let index = 1; index <= count; index++) {
    addresses.push({
      title: faker.lorem.sentence(3),
      state: faker.location.state(),
      city: faker.location.city(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      zip_code: faker.location.zipCode(),
      full_name: faker.person.fullName(),
      mobile: faker.phone.number(),
    });
  }
  return addresses;
}

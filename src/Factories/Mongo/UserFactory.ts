import { faker } from "@faker-js/faker";
import UserModel from "../../components/users/model/User";
import IUser from "src/components/users/model/IUser";

export async function create(count: number = 1, params?: Partial<IUser>) {
  const newUsers: IUser[] = [];
  for (let index = 1; index <= count; index++) {
    const defaultUserParams = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      mobile: faker.phone.number(),
      addresses: [],
      totalOrders: 0,
      wallet: 0,
    };
    const userParams = { ...defaultUserParams, ...params };
    const newUser = new UserModel(userParams);
    await newUser.save();
    newUsers.push(newUser);
  }
  return newUsers;
}

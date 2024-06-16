import { Types } from 'mongoose';
import { faker } from '@faker-js/faker';
export class UserMock {
  public readonly __id: Types.ObjectId;
  public readonly __v: number;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly isAdmin: boolean;

  constructor() {
    this.__id = new Types.ObjectId();
    this.__v = faker.number.int();
    this.name = faker.word.words();
    this.email = faker.internet.email();
    this.password = faker.internet.password();
    this.isAdmin = faker.datatype.boolean();
  }

  public get users() {
    return this;
  }

  private static create() {
    return new UserMock();
  }

  public static getList(length = 2): UserMock[] {
    const users = [] as UserMock[];
    for (let index = 0; index < length; index++) {
      users.push(UserMock.create().users);
    }

    return users;
  }
}

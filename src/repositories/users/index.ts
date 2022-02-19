import { prisma } from "../database";
import { users as IUsersPrisma } from "@prisma/client";

interface ICreateUser {
  authId: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  roles: string[];
  emailVerified: boolean;
  signInProvider: string;
}

export interface IUsers extends IUsersPrisma {
  roles?: Array<String>;
}

export class Users {
  static async createUser({
    authId,
    firstName,
    lastName,
    email,
    picture,
    roles,
    emailVerified,
    signInProvider,
  }: ICreateUser) {
    const user = await prisma.users.create({
      data: {
        auth_id: authId,
        first_name: firstName,
        last_name: lastName,
        email,
        picture,
        role_hash: JSON.stringify(roles),
        check_google: emailVerified && signInProvider.includes("google"),
        check_facebook: emailVerified && signInProvider.includes("facebook"),
      },
    });
    const newUser = { ...user, roles: JSON.parse(user.role_hash) };
    return newUser;
  }

  static async findOneUserByEmail({ email }: { email: string }) {
    const user = await prisma.users.findFirst({ where: { email } });
    if (!user) return null;
    const newUser: IUsers = { ...user, roles: JSON.parse(user.role_hash) };
    return newUser;
  }

  static async findOneUserById({ id }: { id: number }) {
    const user = await prisma.users.findFirst({ where: { id } });
    if (!user) return null;
    const newUser = { ...user, roles: JSON.parse(user.role_hash) };
    return newUser;
  }
}

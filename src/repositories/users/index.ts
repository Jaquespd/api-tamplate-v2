import { prisma } from "../database";
import { Users as IUsersPrisma } from "@prisma/client";

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

export interface IUsers extends IUsersPrisma {}

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
        authId,
        firstName,
        lastName,
        email,
        picture,
        roles,
        checkGoogle: emailVerified && signInProvider.includes("google"),
        checkFacebook: emailVerified && signInProvider.includes("facebook"),
      },
    });
    return user;
  }

  static async updateUser({ userId, firstName, lastName, picture, phone }) {
    const user = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        firstName,
        lastName,
        picture,
        phone,
      },
    });
    return user || false;
  }

  static async listAllUsers() {
    const users = await prisma.users.findMany();
    return users || [];
  }

  static async showOneUser({ userId }) {
    const user = await prisma.users.findFirst({ where: { id: userId } });
    return user || false;
  }

  static async showOneUserWithServices({ userId }) {
    const user = await prisma.users.findFirst({
      where: { id: userId },
      include: { services: true },
    });
    return user || false;
  }

  static async findOneUserByEmail({ email }: { email: string }) {
    const user = await prisma.users.findFirst({ where: { email } });
    return user || false;
  }

  static async findOneUserById({ id }: { id: number }) {
    const user = await prisma.users.findFirst({ where: { id } });
    return user || false;
  }
}

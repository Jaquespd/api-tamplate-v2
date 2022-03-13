import { prisma } from "../database";
import { Users as IUsersPrisma } from "@prisma/client";

export interface ICreateUser {
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
    try {
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
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async updateUser({ userId, firstName, lastName, picture, phone }) {
    try {
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
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async listAllUsers() {
    try {
      const users = await prisma.users.findMany();
      return users || [];
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async showOneUser({ userId }: { userId: number }) {
    try {
      const user = await prisma.users.findFirst({ where: { id: userId } });
      return user || false;
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async showOneUserWithServices({ userId }) {
    try {
      const user = await prisma.users.findFirst({
        where: { id: userId },
        include: { stores: { include: { service: true } } },
      });
      const oneUser = {
        ...user,
        services: user.stores.map((store) => store.service),
      };
      delete oneUser.stores;
      return oneUser || false;
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async findOneUserByEmail({ email }: { email: string }) {
    try {
      const user = await prisma.users.findFirst({ where: { email } });
      return user || false;
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async findOneUserById({ userId }: { userId: number }) {
    try {
      const user = await prisma.users.findFirst({ where: { id: userId } });
      return user || false;
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async showOneUserWithDetails({
    userId,
    roles,
  }: {
    userId: number;
    roles: Array<string>;
  }) {
    try {
      const user = await prisma.users.findFirst({
        where: {
          id: userId,
        },
        include: {
          saves: true,
          stores: {
            include: {
              service: true,
              schedules: { include: { evaluation: true } },
            },
          }, //Provider schedules
          likes: true,
          followings: true,
          followers: true,
          schedules: { include: { evaluation: true } }, //User schedules
        },
      });

      //user
      if (roles.some((r) => r === "user")) {
        const evaluations = [];
        for (const schedule of user.schedules) {
          if (schedule.evaluation) evaluations.push(schedule.evaluation);
        }

        const averageRating =
          evaluations.reduce(
            (acc, evaluation) => acc + Number(evaluation.evaluationProvider),
            0
          ) / evaluations.length;

        delete user.stores;
        return {
          ...user,
          numberOfComments: evaluations.length,
          numberOfSchedules: user.schedules.length,
          averageRating,
          comments: evaluations,
        };
      }

      //provider
      if (roles.some((r) => r === "provider")) {
        const providerUser = {
          ...user,
          services: user.stores.map((store) => store.service),
          schedules: user.stores.reduce(
            (acc, store) => [...acc, ...store.schedules],
            []
          ),
        };
        // delete providerUser.stores;

        const evaluations = [];
        for (const schedule of providerUser.schedules) {
          if (schedule.evaluation) evaluations.push(schedule.evaluation);
        }

        const averageRating =
          evaluations.reduce(
            (acc, evaluation) => acc + Number(evaluation.evaluationProvider),
            0
          ) / evaluations.length;

        return {
          ...providerUser,
          numberOfComments: evaluations.length,
          numberOfSchedules: providerUser.schedules.length,
          averageRating,
          comments: evaluations,
        };
      }
      console.log("ERROR, User IS ADMIN");
      // if (roles.some((r) => r === "admin")) {}

      return {};
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async removeOneUser({ userId }: { userId: number }) {
    try {
      const user = await prisma.users.delete({
        where: {
          id: userId,
        },
      });
      return !!user;
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async addServiceToUser({
    userId,
    serviceId,
  }: {
    userId: number;
    serviceId: number;
  }) {
    try {
      const isAlreadyExist = !!(await prisma.stores.findFirst({
        where: { providerId: userId, serviceId },
      }));
      if (isAlreadyExist) return true;
      const store = await prisma.stores.create({
        data: {
          providerId: userId,
          serviceId,
        },
      });
      return !!store;
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async removeServiceToUser({
    userId,
    serviceId,
  }: {
    userId: number;
    serviceId: number;
  }) {
    try {
      const store = await prisma.stores.deleteMany({
        where: { providerId: userId, serviceId: serviceId },
      });
      return !!store;
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async addFollowingToUser({
    userId,
    userFollowingId,
  }: {
    userId: number;
    userFollowingId: number;
  }) {
    try {
      const isAlreadyExist = !!(await prisma.followings.findFirst({
        where: { userId, userFollowingId },
      }));
      if (isAlreadyExist) return true;
      const following = await prisma.followings.create({
        data: {
          userId,
          userFollowingId,
        },
      });
      return !!following;
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async removeFollowingToUser({
    userId,
    userFollowingId,
  }: {
    userId: number;
    userFollowingId: number;
  }) {
    try {
      const following = await prisma.followings.deleteMany({
        where: { userId, userFollowingId },
      });
      return !!following;
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async addSaveToServiceToUser({
    userId,
    serviceId,
  }: {
    userId: number;
    serviceId: number;
  }) {
    try {
      const isAlreadyExist = !!(await prisma.saves.findFirst({
        where: { userId, serviceId },
      }));
      if (isAlreadyExist) return true;
      const save = await prisma.saves.create({
        data: {
          userId,
          serviceId,
        },
      });
      return !!save;
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async removeSaveToServiceToUser({
    userId,
    serviceId,
  }: {
    userId: number;
    serviceId: number;
  }) {
    try {
      const saves = await prisma.saves.deleteMany({
        where: { userId, serviceId },
      });

      return !!saves;
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async addLikeToServiceToUser({
    userId,
    serviceId,
  }: {
    userId: number;
    serviceId: number;
  }) {
    try {
      const isAlreadyExist = !!(await prisma.likes.findFirst({
        where: { userId, serviceId },
      }));
      if (isAlreadyExist) return true;
      const like = await prisma.likes.create({
        data: {
          userId,
          serviceId,
        },
      });
      return !!like;
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }

  static async removeLikeToServiceToUser({
    userId,
    serviceId,
  }: {
    userId: number;
    serviceId: number;
  }) {
    try {
      const like = await prisma.likes.deleteMany({
        where: { userId, serviceId },
      });
      return !!like;
    } catch (err) {
      if (err) console.log("ERROR: ", err.message);
      return false;
    }
  }
}

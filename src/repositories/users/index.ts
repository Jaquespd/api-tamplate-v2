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

  static async findOneUserById({ userId }: { userId: number }) {
    const user = await prisma.users.findFirst({ where: { id: userId } });
    return user || false;
  }

  static async showOneUserWithDetails({
    userId,
    roles,
  }: {
    userId: number;
    roles: Array<string>;
  }) {
    const user = await prisma.users.findFirst({
      where: {
        id: userId,
      },
      include: {
        saves: true,
        services: { include: { services: true } },
        likes: true,
        followings: true,
        followers: true,
      },
    });
    console.log("user", user);
    // const oneUser = user
    //   ? user
    //   : null;

    // const followings = await Followings.findAll({
    //   where: { userFollowingId: userId },
    // });
    // const followers = followings.map(({ dataValues }) => {
    //   const userFollowerId = dataValues.userFollowingId;
    //   delete dataValues.userFollowingId;
    //   return { ...dataValues, userFollowerId };
    // });

    // let resultEvaluations = {};
    //user
    // if (userType === "user") {
    //   const schedules = await Schedules.findAll({
    //     where: { userId },
    //     include: [{ association: "evaluation" }],
    //   });
    //   const evaluations = [];
    //   for (const schedule of schedules) {
    //     if (schedule.evaluation) evaluations.push(schedule.evaluation);
    //   }

    //   const numberOfComments = evaluations.length;
    //   const averageRating =
    //     evaluations.reduce(
    //       (acc, evaluation) =>
    //         acc + Number(evaluation.dataValues.evaluationProvider),
    //       0
    //     ) / evaluations.length;
    //   const comments = evaluations.map((evaluation) => evaluation.dataValues);
    //   resultEvaluations = {
    //     numberOfComments,
    //     numberOfSchedules: schedules.length,
    //     averageRating,
    //     schedules,
    //     comments,
    //   };
    // }

    //provider
    // if (userType === "provider") {
    //   const userServices = await UserServices.findAll({
    //     where: { providerId: userId },
    //     include: [
    //       {
    //         association: "schedules",
    //         include: [{ association: "evaluation" }, { association: "user" }],
    //       },
    //     ],
    //   });
    //   let schedules = [];
    //   for (const userService of userServices) {
    //     if (userService.schedules.length > 0) {
    //       schedules = [...schedules, ...userService.schedules];
    //     }
    //   }
    //   const evaluations = [];
    //   for (const schedule of schedules) {
    //     if (schedule.evaluation) evaluations.push(schedule);
    //   }

    //   const numberOfComments = evaluations.length;
    //   const averageRating =
    //     evaluations.reduce(
    //       (acc, evaluation) =>
    //         acc + Number(evaluation.dataValues.evaluationUser),
    //       0
    //     ) / evaluations.length;
    //   const comments = evaluations.map((evaluation) => evaluation.dataValues);
    //   resultEvaluations = {
    //     numberOfComments,
    //     numberOfSchedules: schedules.length,
    //     averageRating,
    //     schedules,
    //     comments,
    //   };
    // }

    // return { ...oneUser, ...resultEvaluations, followers };
    return;
  }
}

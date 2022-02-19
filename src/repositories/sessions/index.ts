import { prisma } from "../database";
import { sign } from "jsonwebtoken";

interface ICreateAccessToken {
  userId: number;
}
interface ICreateRefreshToken {
  userId: number;
}
interface IFindRefreshToken {
  refreshToken: string;
}

export class Sessions {
  static async createAccessToken({ userId }: ICreateAccessToken) {
    const token = sign({}, process.env.TOKEN_SECRET, {
      subject: userId.toString(),
      expiresIn: "86400s",
    });
    return token;
  }

  static async createRefreshToken({ userId }: ICreateRefreshToken) {
    const date = new Date();
    const interval = 30 * 24 * 60 * 60 * 1000; // 2 hours in milliseconds
    const expiresIn = Math.round((date.getTime() + interval) / 1000); // in secondes

    await prisma.refreshTokens.deleteMany({
      where: {
        userId,
      },
    });
    const refreshToken = await prisma.refreshTokens.create({
      data: {
        userId,
        expiresIn,
      },
    });
    return refreshToken;
  }

  static async findRefreshToken({ refreshToken }: IFindRefreshToken) {
    const oldRefreshToken = await prisma.refreshTokens.findFirst({
      where: { id: refreshToken },
    });
    return oldRefreshToken;
  }
}

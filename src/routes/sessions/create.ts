import Joi from "joi";
import { Request, Response } from "express";
import { success, invalid, failure, notFound } from "../../services/response";
import { Users, ICreateUser } from "../../repositories/users";
import { Sessions } from "../../repositories/sessions";

declare module "express-serve-static-core" {
  interface Request {
    user?: ICreateUser;
  }
}

export default async (req: Request, res: Response) => {
  const {
    authId,
    firstName,
    lastName,
    email,
    picture,
    emailVerified,
    signInProvider,
  } = req.user;
  const schema = Joi.object({
    authId: Joi.string().min(3).max(50).required(),
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50),
    email: Joi.string().email().required(),
    picture: Joi.string().uri(),
  });

  try {
    await schema.validateAsync({ authId, firstName, lastName, email, picture });
  } catch (err) {
    console.log("***Error:", err.message);
    return invalid(res, { error: err.message });
  }
  try {
    let user = await Users.findOneUserByEmail({ email });
    if (!user) {
      const roles = ["user"]; //Default
      user = await Users.createUser({
        authId,
        firstName,
        lastName,
        email,
        picture,
        roles,
        emailVerified,
        signInProvider,
      });
      if (!user) return notFound(res);
    }

    //Create Session
    const token = await Sessions.createAccessToken({
      userId: user.id,
    });

    const refreshToken = await Sessions.createRefreshToken({
      userId: user.id,
    });

    const credentials = {
      token,
      refreshToken,
      provider: "beiramar.com",
    };

    return success(res, {
      user,
      credentials,
    });
  } catch (err) {
    console.log("***Error:", err.message);
    return failure(res, { error: err.message });
  }
};

import Joi from "joi";
import { Request, Response } from "express";
import { success, invalid, failure, notFound } from "../../services/response";
import { Users } from "../../repositories/users";

export default async (req: Request, res: Response) => {
  const { id: userId } = res.user;
  const { userFollowingId } = req.body;
  const schema = Joi.object({
    userId: Joi.number().integer().min(1).required(),
    userFollowingId: Joi.number().integer().min(1).required(),
  });

  try {
    await schema.validateAsync({
      userId,
      userFollowingId,
    });
  } catch (err) {
    console.log("***Error:", err.message);
    return invalid(res);
  }

  try {
    const following = await Users.addFollowingToUser({
      userId,
      userFollowingId,
    });
    if (!following) return notFound(res);
    return success(res, following);
  } catch (err) {
    console.log("***Error:", err.message);
    return failure(res);
  }
};

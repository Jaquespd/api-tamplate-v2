import Joi from "joi";
import { Request, Response } from "express";
import { success, invalid, failure, notFound } from "../../services/response";
import { Users } from "../../repositories/users";

export default async (req: Request, res: Response) => {
  const { id: userId } = req.params;
  const { roles } = res.user;
  const schema = Joi.object({
    userId: Joi.number().integer().min(1).required(),
  });

  try {
    await schema.validateAsync({
      userId,
    });
  } catch (err) {
    console.log("***Error:", err.message);
    return invalid(res);
  }
  try {
    const user = await Users.showOneUserWithDetails({
      userId: Number(userId),
      roles,
    });
    if (!user) return notFound(res);
    return success(res, user);
  } catch (err) {
    console.log("***Error:", err.message);
    return failure(res);
  }
};

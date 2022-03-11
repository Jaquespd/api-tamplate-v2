import Joi from "joi";
import { Request, Response } from "express";
import { success, invalid, failure, notFound } from "../../services/response";
import { Users } from "../../repositories/users";

export default async (req: Request, res: Response) => {
  const { id: userId } = req.params;
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
    const isRemoved = await Users.removeOneUser({ userId: Number(userId) });
    if (!isRemoved) return notFound(res);
    return success(res, isRemoved);
  } catch (err) {
    console.log("***Error:", err.message);
    return failure(res);
  }
};

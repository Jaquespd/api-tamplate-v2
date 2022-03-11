import Joi from "joi";
import { Request, Response } from "express";
import { success, invalid, failure, notFound } from "../../services/response";
import { Users } from "../../repositories/users";

export default async (req: Request, res: Response) => {
  const { id: userId } = res.user;
  const { id: serviceId } = req.params;
  const schema = Joi.object({
    userId: Joi.number().integer().min(1).required(),
    serviceId: Joi.string().min(1).required(),
  });

  try {
    await schema.validateAsync({
      userId,
      serviceId,
    });
  } catch (err) {
    console.log("***Error:", err.message);
    return invalid(res);
  }

  try {
    const like = await Users.removeLikeToServiceToUser({
      userId,
      serviceId: Number(serviceId),
    });
    if (!like) return notFound(res);
    return success(res, like);
  } catch (err) {
    console.log("***Error:", err.message);
    return failure(res);
  }
};

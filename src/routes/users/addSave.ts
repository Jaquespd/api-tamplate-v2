import Joi from "joi";
import { Request, Response } from "express";
import { success, invalid, failure, notFound } from "../../services/response";
import { Users } from "../../repositories/users";

export default async (req: Request, res: Response) => {
  const { id: userId } = res.user;
  const { serviceId } = req.body;
  const schema = Joi.object({
    userId: Joi.number().integer().min(1).required(),
    serviceId: Joi.number().integer().min(1).required(),
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
    const save = await Users.addSaveToServiceToUser({ userId, serviceId });
    if (!save) return notFound(res);
    return success(res, save);
  } catch (err) {
    console.log("***Error:", err.message);
    return failure(res);
  }
};

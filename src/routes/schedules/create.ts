import Joi from "joi";
import { Request, Response } from "express";
import { success, invalid, failure, notFound } from "../../services/response";
import { Schedules } from "../../repositories/schedules";

export default async (req: Request, res: Response) => {
  const { id: userId } = res.user;
  const { providerId, serviceId, userServiceDate } = req.body;

  const schema = Joi.object({
    providerId: Joi.number().integer().required(),
    serviceId: Joi.number().integer().required(),
    userServiceDate: Joi.string().required(),
  });

  try {
    await schema.validateAsync({
      providerId,
      serviceId,
      userServiceDate,
    });
  } catch (err) {
    console.log("***Error:", err.message);
    return invalid(res);
  }

  try {
    const schedule = await Schedules.createSchedule({
      userId,
      providerId,
      serviceId,
      userServiceDate,
    });
    return success(res, {
      ...schedule,
    });
  } catch (err) {
    console.log("err", err.message);
    return failure(res);
  }
};

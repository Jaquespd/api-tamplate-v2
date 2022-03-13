import Joi from "joi";
import { Request, Response } from "express";
import { success, invalid, failure, notFound } from "../../services/response";
import { Schedules } from "../../repositories/schedules";

export default async (req: Request, res: Response) => {
  const { serviceId } = req.params;

  const schema = Joi.object({
    serviceId: Joi.string().min(1).required(),
  });
  try {
    await schema.validateAsync({
      serviceId,
    });
  } catch (err) {
    console.log("***Error:", err.message);
    return invalid(res);
  }

  try {
    const schedules = await Schedules.listAllSchedulesOneService({
      serviceId: Number(serviceId),
    });
    return success(res, schedules);
  } catch (err) {
    console.log("***Error:", err.message);
    return failure(res);
  }
};

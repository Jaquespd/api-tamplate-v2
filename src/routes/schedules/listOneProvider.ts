import Joi from "joi";
import { Request, Response } from "express";
import { success, invalid, failure, notFound } from "../../services/response";
import { Schedules } from "../../repositories/schedules";

export default async (req: Request, res: Response) => {
  const { providerId } = req.params;

  const schema = Joi.object({
    providerId: Joi.string().min(1).required(),
  });
  try {
    await schema.validateAsync({
      providerId,
    });
  } catch (err) {
    console.log("***Error:", err.message);
    return invalid(res);
  }

  try {
    const schedules = await Schedules.listAllSchedulesOneProvider({
      providerId: Number(providerId),
    });
    return success(res, schedules);
  } catch (err) {
    console.log("***Error:", err.message);
    return failure(res);
  }
};

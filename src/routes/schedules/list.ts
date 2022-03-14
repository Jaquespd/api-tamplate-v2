import Joi from "joi";
import { Request, Response } from "express";
import { success, invalid, failure, notFound } from "../../services/response";
import { Schedules } from "../../repositories/schedules";

export default async (req: Request, res: Response) => {
  try {
    const schedules = await Schedules.listAllSchedules();
    return success(res, schedules);
  } catch (err) {
    console.log("***Error:", err.message);
    return failure(res);
  }
};

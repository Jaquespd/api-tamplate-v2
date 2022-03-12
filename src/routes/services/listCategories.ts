import Joi from "joi";
import { Request, Response } from "express";
import { success, invalid, failure, notFound } from "../../services/response";
import { Services } from "../../repositories/services";

export default async (req: Request, res: Response) => {
  try {
    const servicesCategories = await Services.listAllCategoriesServices();
    return success(res, servicesCategories);
  } catch (err) {
    console.log("***Error:", err.message);
    return failure(res);
  }
};

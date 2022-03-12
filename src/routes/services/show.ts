import Joi from "joi";
import { Request, Response } from "express";
import { success, invalid, failure, notFound } from "../../services/response";
import { Services } from "../../repositories/services";

export default async (req: Request, res: Response) => {
  const { id: serviceId } = req.params;

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
    const service =
      await Services.showOneServiceWithPhotosWithProvidersWithEvaluation({
        serviceId: Number(serviceId),
      });
    if (!service) return notFound(res);
    return success(res, service);
  } catch (err) {
    console.log("***Error:", err.message);
    return failure(res);
  }
};

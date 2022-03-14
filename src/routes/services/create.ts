import Joi from "joi";
import { Request, Response } from "express";
import { success, invalid, failure, notFound } from "../../services/response";
import { Services } from "../../repositories/services";

export default async (req: Request, res: Response) => {
  const {
    title,
    subtitle,
    description,
    city,
    state,
    areaAvailability,
    routeMap,
    price,
    warning,
    categories,
    hashtags,
    distance,
    stops,
    duration,
    coverPhoto,
    location,
    isActive,
  } = req.body;

  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    subtitle: Joi.string(),
    description: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    areaAvailability: Joi.array().items(Joi.string()).required(),
    routeMap: Joi.string(),
    price: Joi.number().required(),
    warning: Joi.string(),
    categories: Joi.array().items(Joi.string()).required(),
    hashtags: Joi.array().items(Joi.string()).required(),
    distance: Joi.number().required(),
    stops: Joi.number().required(),
    duration: Joi.number().required(),
    coverPhoto: Joi.string().required(),
    location: Joi.array().items(Joi.string()).required(),
    isActive: Joi.boolean().required(),
  });

  try {
    await schema.validateAsync({
      title,
      subtitle,
      description,
      city,
      state,
      areaAvailability,
      routeMap,
      price,
      warning,
      categories,
      hashtags,
      distance,
      stops,
      duration,
      coverPhoto,
      location,
      isActive,
    });
  } catch (err) {
    console.log("***Error:", err.message);
    return invalid(res);
  }

  try {
    const service = await Services.createService({
      title,
      subtitle,
      description,
      city,
      state,
      areaAvailability,
      routeMap,
      price,
      warning,
      categories,
      hashtags,
      distance,
      stops,
      duration,
      coverPhoto,
      location,
      isActive,
    });
    if (!service) return notFound(res, { error: "Teste" });
    return success(res, {
      ...service,
    });
  } catch (err) {
    console.log("***Error:", err.message);
    return failure(res);
  }
};

import Joi from "joi";
import { Request, Response } from "express";
import { success, invalid, failure, notFound } from "../../services/response";
import { Services } from "../../repositories/services";

export default async (req: Request, res: Response) => {
  //ERRADA Adicionar os provedores que fazem determinado serviço
  const { id: serviceId } = req.params;
  const service =
    await Services.showOneServiceWithPhotosWithProvidersWithEvaluation({
      serviceId: Number(serviceId),
    });
  return success(res, service);
};

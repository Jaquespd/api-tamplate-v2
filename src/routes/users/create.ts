import Joi from "joi";
import { Request, Response } from "express";
import { success, invalid, failure, notFound } from "../../services/response";
import { Users } from "../../repositories/users";

export default async (req: Request, res: Response) => {
  // const user = res.user;
  // const { firstName, lastName, phone, picture } = req.body;
  // const result = await Users.removeLikeToServiceToUser({
  //   userId: 499,
  //   serviceId: 2,
  // });
  return success(res, "result");
};

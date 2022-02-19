import Joi from "joi";
import { Request, Response } from "express";
import { success, invalid, failure, notFound } from "../../services/response";
import { Users } from "../../repositories/users";
import { Sessions } from "../../repositories/sessions";

export default async (req: Request, res: Response) => {
  const user = res.user;

  return success(res, user);
};

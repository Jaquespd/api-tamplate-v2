import Joi from "joi";
import { Request, Response } from "express";
import { success, invalid, failure, notFound } from "../../services/response";
import { Users } from "../../repositories/users";

export default async (req: Request, res: Response) => {
  try {
    const users = await Users.listAllUsers();
    return success(res, users);
  } catch (err) {
    console.log("***Error:", err.message);
    return failure(res);
  }
};

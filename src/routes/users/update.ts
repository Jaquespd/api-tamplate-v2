import Joi from "joi";
import { Request, Response } from "express";
import { success, invalid, failure, notFound } from "../../services/response";
import { Users } from "../../repositories/users";

export default async (req: Request, res: Response) => {
  const { id: userId } = res.user;
  const { firstName, lastName, picture, phone } = req.body;
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    picture: Joi.string().uri(),
    phone: Joi.string().min(10).max(11).required(), //TODO schema for cell number
  });

  try {
    await schema.validateAsync({ firstName, lastName, picture, phone });
  } catch (err) {
    console.log("***Error:", err.message);
    return invalid(res);
  }
  try {
    const user = await Users.updateUser({
      userId,
      firstName,
      lastName,
      picture,
      phone,
    });
    if (!user) return notFound(res);
    return success(res, {
      ...user,
    });
  } catch (err) {
    console.log("***Error:", err.message);
    return failure(res);
  }
};

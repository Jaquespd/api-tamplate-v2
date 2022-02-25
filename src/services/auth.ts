import { verify } from "jsonwebtoken";
import { Request, Response } from "express";
import { Users, IUsers } from "../repositories/users";
import { unauthorized, unallowed, notFound } from "../services/response";

declare module "express-serve-static-core" {
  interface Response {
    user?: IUsers;
  }
}

export default (roles) => async (req: Request, res: Response, next) => {
  let authHeader = req.headers.authorization;
  //FOR DEV
  if (process.env.NODE_ENV === "development" && authHeader === "Bearer dev")
    authHeader = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDUyMjUzMjMsImV4cCI6MTY0NTMxMTcyMywic3ViIjoiOSJ9.dzc6Fv2VnF8_CJxkn2_CnKyVgFTy8z7ywewDITi_nJQ`;
  if (!authHeader) {
    return unauthorized(res);
  }

  const [, token] = authHeader.split(" ");

  try {
    //TODO Add condition for dev. Change verify for decode.
    const { sub: id } = verify(token, process.env.TOKEN_SECRET, {
      complete: true,
    }).payload;
    const user = await Users.findOneUserById({ userId: Number(id) });
    if (!user) return notFound(res);
    res.user = user;
  } catch (err) {
    console.log("***Error:", err.message);
    return unauthorized(res);
  }
  // Permissions
  if (!roles || roles === "all") return next();
  for (const role of res.user.roles) {
    if (Array.isArray(roles) && roles.some((r) => r === role)) return next();
  }
  return unallowed(res);
};

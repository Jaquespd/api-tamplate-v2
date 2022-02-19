import { Request, Response } from "express";

export const general = (res: Response, status, json) => {
  res.status(status);
  res.json(json);
  res.end();
};

export const success = (res: Response, json: any = { message: "OK" }) => {
  if (process.env.NODE_ENV === "production") json = { message: "OK" };
  return general(res, 200, json);
};

export const failure = (res: Response, json = { error: "Unknown error." }) => {
  if (process.env.NODE_ENV === "production") json = { error: "Unknown error." };
  return general(res, 500, json);
};

export const invalid = (res: Response, json = { error: "Invalid entry." }) => {
  if (process.env.NODE_ENV === "production") json = { error: "Invalid entry." };
  return general(res, 400, json);
};

export const unauthorized = (
  res: Response,
  json = { error: "Unauthorized user." }
) => {
  if (process.env.NODE_ENV === "production")
    json = { error: "Unauthorized user." };
  return general(res, 401, json);
};

export const unallowed = (
  res: Response,
  json = { error: "User not allowed." }
) => {
  if (process.env.NODE_ENV === "production")
    json = { error: "User not allowed." };
  return general(res, 403, json);
};

export const notFound = (res: Response, json = { error: "Not found." }) => {
  if (process.env.NODE_ENV === "production") json = { error: "Not found." };
  return general(res, 404, json);
};

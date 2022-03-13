import express from "express";
import asyncMiddleware from "../../services/asyncMiddleware";
import auth from "../../services/auth";
import create from "./create";
import list from "./list";
import listOneService from "./listOneService";
import listOneProvider from "./listOneProvider";

const router = express.Router();

router.post("/", asyncMiddleware(auth(["user"])));
router.post("/", asyncMiddleware(create));

router.get("/", asyncMiddleware(auth(["admin"])));
router.get("/", asyncMiddleware(list));

router.get("/service/:serviceId", asyncMiddleware(auth(["admin", "user"])));
router.get("/service/:serviceId", asyncMiddleware(listOneService));

router.get(
  "/provider/:providerId",
  asyncMiddleware(auth(["admin", "provider"]))
);
router.get("/provider/:providerId", asyncMiddleware(listOneProvider));

export default router;

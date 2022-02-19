import express from "express";
import asyncMiddleware from "../../services/asyncMiddleware";
import auth from "../../services/auth";
import create from "./create";

const router = express.Router();

router.post("/", asyncMiddleware(auth("all")));
router.post("/", asyncMiddleware(create));

export default router;

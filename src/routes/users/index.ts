import express from "express";
import asyncMiddleware from "../../services/asyncMiddleware";
import auth from "../../services/auth";
import { firebaseAuth } from "../../services/firebaseAuth";
import create from "./create";
import refresh from "./refresh";

const router = express.Router();

router.post("/", asyncMiddleware(auth("all")));
router.post("/", asyncMiddleware(create));

// router.post("/refresh", asyncMiddleware(auth()));
router.post("/refresh", asyncMiddleware(refresh));

export default router;

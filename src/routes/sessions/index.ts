import express from "express";
import asyncMiddleware from "../../services/asyncMiddleware";
import { firebaseAuth } from "../../services/firebaseAuth";
import create from "./create";
import refresh from "./refresh";

const router = express.Router();

router.post("/", asyncMiddleware(firebaseAuth), asyncMiddleware(create));
router.post("/refresh", asyncMiddleware(refresh));

export default router;

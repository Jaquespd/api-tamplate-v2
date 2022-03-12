import express from "express";
import asyncMiddleware from "../../services/asyncMiddleware";
import auth from "../../services/auth";
import create from "./create";
import list from "./list";
import show from "./show";
import remove from "./remove";
import listCategories from "./listCategories";

const router = express.Router();

router.post("/", asyncMiddleware(auth(["admin"])));
router.post("/", asyncMiddleware(create));
router.get("/", asyncMiddleware(auth(["admin", "user", "provider"])));
router.get("/", asyncMiddleware(list));

/**
 * As rotas de string fixa devem ficar antes das dinamicas, se não o router vai
 * pensar que a string categories é um :id
 * */

router.get("/categories", asyncMiddleware(auth(["admin", "user", "provider"])));
router.get("/categories", asyncMiddleware(listCategories));
router.get("/:id", asyncMiddleware(auth(["admin", "user", "provider"])));
router.get("/:id", asyncMiddleware(show));
router.delete("/:id", asyncMiddleware(auth(["admin"])));
router.delete("/:id", asyncMiddleware(remove));

export default router;

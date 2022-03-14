import express from "express";
import asyncMiddleware from "../../services/asyncMiddleware";
import auth from "../../services/auth";

import create from "./create";
import update from "./update";
import list from "./list";
import show from "./show";
import remove from "./remove";
import addService from "./addService";
import removeService from "./removeService";
import addFollowing from "./addFollowing";
import removeFollowing from "./removeFollowing";
import addSave from "./addSave";
import removeSave from "./removeSave";
import addLike from "./addLike";
import removeLike from "./removeLike";

const router = express.Router();

// router.post('/', asyncMiddleware(auth()));
// router.post('/', asyncMiddleware(create));

router.put("/", asyncMiddleware(auth(["user", "provider"])));
router.put("/", asyncMiddleware(update));

router.put("/add-service", asyncMiddleware(auth(["provider"])));
router.put("/add-service", asyncMiddleware(addService));

router.put("/remove-service", asyncMiddleware(auth(["provider"])));
router.put("/remove-service", asyncMiddleware(removeService));

router.post("/add-following", asyncMiddleware(auth(["user", "provider"])));
router.post("/add-following", asyncMiddleware(addFollowing));

router.delete(
  "/remove-following/:id",
  asyncMiddleware(auth(["user", "provider"]))
);
router.delete("/remove-following/:id", asyncMiddleware(removeFollowing));

router.get("/", asyncMiddleware(auth(["admin"])));
router.get("/", asyncMiddleware(list));

// VERIFICAR ISSO, SE TODOS PODEM VER INFORMACOES OU SERÁ OUTRA ROTA LIMITADA
router.get("/:id", asyncMiddleware(auth(["admin", "user", "provider"])));
router.get("/:id", asyncMiddleware(show));

router.delete("/:id", asyncMiddleware(auth(["admin"])));
router.delete("/:id", asyncMiddleware(remove));

router.post("/add-save", asyncMiddleware(auth(["user", "provider"])));
router.post("/add-save", asyncMiddleware(addSave));

router.delete("/remove-save/:id", asyncMiddleware(auth(["user", "provider"])));
router.delete("/remove-save/:id", asyncMiddleware(removeSave));

router.post("/add-like", asyncMiddleware(auth(["user", "provider"])));
router.post("/add-like", asyncMiddleware(addLike));

router.delete("/remove-like/:id", asyncMiddleware(auth(["user", "provider"])));
router.delete("/remove-like/:id", asyncMiddleware(removeLike));

export default router;

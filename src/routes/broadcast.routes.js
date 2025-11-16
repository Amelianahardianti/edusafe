import { Router } from "express";
import { authMiddleware, roleRequired } from "../middlewares/authMiddleware.js";
import * as ctrl from "../controllers/broadcast.controller.js";
import { cacheGet, cacheSet, cacheFor } from "../middlewares/cache.js";

const r = Router();
r.use(authMiddleware);
r.get("/all", roleRequired("admin"),cacheFor(300), cacheGet, cacheSet, ctrl.listAll);
r.get("/", cacheFor(300), cacheGet, cacheSet, ctrl.listActive);

r.post("/", roleRequired("admin","teacher"), ctrl.create);
r.put("/:id", roleRequired("admin","teacher"), ctrl.update);
r.delete("/:id", roleRequired("admin"), ctrl.remove);

export default r;

// src/routes/Child.routes.js
import { Router } from "express";
import { authMiddleware, roleRequired } from "../middlewares/authMiddleware.js";
import * as ctrl from "../controllers/Child.controller.js";

const r = Router();
r.use(authMiddleware);

r.post("/",  roleRequired("admin","teacher"), ctrl.create);
r.get("/",   roleRequired("admin","teacher"), ctrl.list);
r.get("/:id",roleRequired("admin","teacher"), ctrl.detail);
r.patch("/:id", roleRequired("admin","teacher"), ctrl.update);
r.delete("/:id", roleRequired("admin"), ctrl.remove);

export default r;

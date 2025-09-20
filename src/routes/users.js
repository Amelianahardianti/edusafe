import { Router } from "express";
import { authMiddleware, requireAdmin, roleRequired } from "../middlewares/authMiddleware.js";
import * as ctrl from "../controllers/user.controller.js";

const r = Router();

r.use(authMiddleware);
r.use(roleRequired("admin"));

r.get("/", ctrl.getUsers);
r.get("/:id", ctrl.detail);
r.post("/",  ctrl.create);
r.patch("/:id", ctrl.update);
r.delete("/:id", ctrl.remove);

export default r;

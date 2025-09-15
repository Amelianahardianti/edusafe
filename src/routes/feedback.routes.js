import { Router } from "express";
import { authMiddleware, roleRequired } from "../middlewares/authMiddleware.js";
import * as ctrl from "../controllers/feedback.controller.js";

const r = Router();
r.use(authMiddleware);

r.get("/", roleRequired("admin","teacher","parent"), ctrl.list);
r.post("/", roleRequired("parent"), ctrl.create);

export default r;

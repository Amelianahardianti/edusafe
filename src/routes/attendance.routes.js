import { Router } from "express";
import { authMiddleware, roleRequired } from "../middlewares/authMiddleware.js";
import * as ctrl from "../controllers/attendance.controller.js";

const r = Router();
r.use(authMiddleware);

r.get("/child/:childId", ctrl.listByChild);
r.post("/", roleRequired("admin", "teacher"), ctrl.create);
r.put("/:id", roleRequired("admin", "teacher"), ctrl.update);

export default r;

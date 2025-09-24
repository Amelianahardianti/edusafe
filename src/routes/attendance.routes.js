import { Router } from "express";
import { authMiddleware, roleRequired } from "../middlewares/authMiddleware.js";
import * as ctrl from "../controllers/attendance.controller.js";
import { cacheGet, cacheSet, cacheFor } from "../middlewares/cache.js";

const r = Router();
r.use(authMiddleware);

r.get("/child/:childId", ctrl.listByChild);

r.get("/recap/weekly/:childId", cacheFor(600), cacheGet, cacheSet, ctrl.recapWeekly);

r.post("/", roleRequired("admin", "teacher"), ctrl.create);
r.put("/:id", roleRequired("admin", "teacher"), ctrl.update);

export default r;

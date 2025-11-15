import { Router } from "express";
import { authMiddleware, roleRequired } from "../middlewares/authMiddleware.js";
import * as ctrl from "../controllers/ActivityChild.controller.js";

const r = Router();
r.use(authMiddleware);

r.get("/",roleRequired("teacher","admin"), ctrl.listMine);  //melihat aktivitas semua anak (teacher dan admin)
r.get("/:id", ctrl.detail);  //melihat aktivitas satu anak (parent/teacher/admin)
r.post("/", roleRequired("teacher","admin"), ctrl.create); //membuat catatan activitas anak
r.patch("/:id", roleRequired("teacher","admin"), ctrl.update); //mengubah catatan aktivitas anak
r.delete("/:id", roleRequired("teacher","admin"), ctrl.remove); //menghapus catatan aktivitas anak

export default r;



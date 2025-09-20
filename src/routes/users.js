import { Router } from "express";
import { authMiddleware, requireAdmin, roleRequired } from "../middlewares/authMiddleware.js";
import * as ctrl from "../controllers/user.controller.js";

const r = Router();

r.use(authMiddleware);
r.use(roleRequired("admin"));

r.get("/", ctrl.getUsers); //admin lihat semua user
r.get("/:id", ctrl.detail); //admin lihat detail user
r.post("/",  ctrl.create); //admin bikin akun baru
r.patch("/:id", ctrl.update); //admin ubah data user
r.delete("/:id", ctrl.remove); //admin hapus user

export default r;

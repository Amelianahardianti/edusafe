import { Router } from "express";
import { authMiddleware, roleRequired } from "../middlewares/authMiddleware.js";
import * as ctrl from "../controllers/user.conrtoller.js";

const r = Router();

//semua endpoint di bawah ini harus login dan admin
r.use(authMiddleware);
r.use(roleRequired("admin"));   

r.get("/", ctrl.getUsers);
r.get("/:id", ctrl.detail);
r.post("/", ctrl.create);
r.patch("/:id", ctrl.update);
r.delete("/:id", ctrl.remove);

export default r;
// routes/auth.routes.js
import { Router } from "express";
import { ping, changePassword, login } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const r = Router();

r.get("/ping", ping);
//r.post("/register", register); //gw hapus karena gak perlu registrasi user baru selain admin
r.post("/login", login);
r.patch("/change-password", authMiddleware, changePassword);

//buat test ambil data user dari token
r.get("/me", authMiddleware, (req, res) => {
  res.json({ userFromToken: req.user }); // harus ada { id, role, email }
});

export default r;

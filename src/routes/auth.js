// routes/auth.routes.js
import { Router } from "express";
import { ping, register, login } from "../controllers/auth.controller.js";

const r = Router();

r.get("/ping", ping);
r.post("/register", register);
r.post("/login", login);

export default r;

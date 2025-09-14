// controllers/auth.controller.js
import bcrypt from "bcryptjs";          // saran: pakai bcryptjs biar gak ribet native build
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const issueToken = (user) => {
  const payload = { sub: user._id.toString(), role: user.role, name: user.name };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const ping = (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role = "parent" } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "email & password required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role });

    res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) { next(err); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ msg: "user not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ msg: "wrong password" });

    const token = issueToken(user);

    // opsi A: return di body
    return res.json({ token });

    // opsi B (tambahan): set cookie httpOnly (kalau mau)
    // res.cookie("token", token, {
    //   httpOnly: true, secure: process.env.NODE_ENV === "production",
    //   sameSite: "lax", maxAge: 24*60*60*1000
    // }).json({ ok: true });
  } catch (err) { next(err); }
};

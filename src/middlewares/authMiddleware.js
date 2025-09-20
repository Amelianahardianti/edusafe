import jwt from "jsonwebtoken";
import User from "../models/User.js"; // 

export const authMiddleware = (req, res, next) => {
  try {
    let token = null;
    const auth = req.headers.authorization;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      token = auth.substring(7);
    }
    if (!token && req.cookies?.token) token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: "unauthenticated" });
    console.log("[authMiddleware] header =", req.headers.authorization);

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("[authMiddleware] payload =", payload); // 👈 log ini
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "unauthenticated" });
  }
};


export function roleRequired(...allowed) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ msg: "unauthenticated" });
    if (!allowed.includes(req.user.role)) {
      return res.status(403).json({ msg: "forbidden" });
    }
    next();
  };
}

export const requireAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "unauthenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded =", decoded);

    if (decoded.role !== "admin") {
      return res.status(403).json({ msg: "forbidden admin only" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "invalid token" });
  }
};


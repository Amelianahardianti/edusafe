import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        let token = null;
        const auth = req.headers.authorization;
        if (auth && auth.toLowerCase().startsWith("bearer ")) {
            token = auth.substring(7);
        }   

        if (!token && !req.cookies.token) {
            token = req.cookies.token;
        }
        if (!token) return res.status(401).json({ msg: "unauthenticated" });

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; 
        next();
    } catch (err) {
        return res.status(401).json({ msg: "unauthenticated" });
    }
}

export function roleRequired(...allowed) {
    return (req, res, next) => {
        if (!req.user)  return res.status(401).json({ msg: "unauthenticated" });
        if (!allowed.includes(req.user.role)) {
            return res.status(403).json({ msg: "forbidden" });
        }
        next();
    };
}
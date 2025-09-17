import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getMiddayForecast } from "../services/weather.service.js";

const r = Router();
//untuk uji Postman tanpa login, bisa komentari baris di bawah
// r.use(authMiddleware);

r.get("/midday", async (req, res, next) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      return res.status(400).json({ msg:"lat & lon required as numbers" });
    }
    const data = await getMiddayForecast(lat, lon);
    res.json(data);
  } catch (e) { next(e); }
});

export default r;

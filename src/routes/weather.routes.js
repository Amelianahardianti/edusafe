import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getMiddayForecast } from "../services/weather.service.js";

const r = Router();
r.use(authMiddleware);

/**
 * GET /api/weather/midday?lat=...&lon=...
 */
r.get("/midday", async (req, res, next) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ msg:"lat & lon required" });
    const data = await getMiddayForecast(lat, lon);
    res.json(data);
  } catch (e) { next(e); }
});

export default r;
import SystemNotification from "../models/SystemNotification.js";
import { getMiddayForecast } from "../services/weather.service.js";

/**
 * Simple daily scheduler using setTimeout + setInterval (no deps)
 * It will run at HH:MM server local time (default 09:00).
 */
export function startWeatherNotifier({ lat, lon, hour = 9, minute = 0 }) {
  if (!process.env.OPENWEATHER_API_KEY) {
    console.warn("[weatherNotifier] OPENWEATHER_API_KEY not set, notifier disabled.");
    return;
  }
  if (!lat || !lon) {
    console.warn("[weatherNotifier] lat/lon missing, notifier disabled.");
    return;
  }

  const run = async () => {
    try {
      const forecast = await getMiddayForecast(lat, lon);
      if (forecast.rainLikely) {
        const key = `weather-${forecast.date}`;
        const from = new Date(`${forecast.date}T02:00:00.000Z`); // start early
        const to   = new Date(`${forecast.date}T15:00:00.000Z`); // expire after school

        await SystemNotification.create({
          title: "Himbauan Hujan Siang Ini",
          body: "Perkiraan hujan antara pukul 11.00–13.00. Mohon siapkan jas hujan/payung saat penjemputan.",
          audience: "parents",
          tags: ["weather","rain"],
          validFrom: from,
          validTo: to,
          dedupeKey: key
        }).catch(err => {
          if (err && err.code === 11000) {
            // already created today
            return;
          }
          throw err;
        });
      }
    } catch (e) {
      console.error("[weatherNotifier] error:", e.message);
    }
  };

  const scheduleNext = () => {
    const now = new Date();
    const next = new Date(now);
    next.setHours(hour, minute, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);
    const wait = next.getTime() - now.getTime();
    setTimeout(() => {
      run();
      setInterval(run, 24 * 60 * 60 * 1000);
    }, wait);
  };

  scheduleNext();
}
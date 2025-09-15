/**
 * Weather service (OpenWeather One Call 3.0)
 * Requires env OPENWEATHER_API_KEY
 * Uses native fetch (Node 18+)
 */
const BASE = "https://api.openweathermap.org/data/3.0/onecall";

export async function getMiddayForecast(lat, lon) {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) throw new Error("OPENWEATHER_API_KEY is not set");
  const url = `${BASE}?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${key}&units=metric`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error("OpenWeather error: " + resp.status);
  const data = await resp.json();

  const tz = data.timezone_offset || 0; // seconds
  const now = new Date();
  const localNow = new Date(now.getTime() + tz * 1000);
  const y = localNow.getFullYear();
  const m = localNow.getMonth();
  const d = localNow.getDate();

  const startLocal = new Date(y, m, d, 11, 0, 0); // local 11:00
  const endLocal   = new Date(y, m, d, 13, 0, 0); // local 13:00
  const startUTC = new Date(startLocal.getTime() - tz * 1000);
  const endUTC   = new Date(endLocal.getTime() - tz * 1000);

  const hours = (data.hourly || []).filter(h => {
    const t = new Date(h.dt * 1000);
    return t >= startUTC && t < endUTC;
  }).map(h => {
    const local = new Date(h.dt * 1000 + tz * 1000);
    return {
      timeLocal: local.toISOString().substring(11,16), // HH:MM
      temp: h.temp,
      pop: h.pop || 0,
      weather: h.weather && h.weather.length ? h.weather[0].main : ""
    };
  });

  const rainLikely = hours.some(h => h.pop >= 0.4 || /rain/i.test(h.weather));

  return {
    date: startLocal.toISOString().substring(0,10),
    hours,
    rainLikely
  };
}
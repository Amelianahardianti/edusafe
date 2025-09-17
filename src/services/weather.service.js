/**
 * Weather service (WeatherAPI.com)
 * Requires env WEATHERAPI_KEY
 * Uses native fetch (Node 18+)
 */
const BASE = "https://api.weatherapi.com/v1/forecast.json";

export async function getMiddayForecast(lat, lon) {
  const key = process.env.WEATHERAPI_KEY;
  if (!key) throw new Error("WEATHERAPI_KEY is not set");

  const q = `${lat},${lon}`;
  const url = `${BASE}?key=${key}&q=${encodeURIComponent(q)}&days=1&aqi=no&alerts=no`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error("WeatherAPI error: " + resp.status);
  const data = await resp.json();

  // Hourly array for today
  const hours = (data?.forecast?.forecastday?.[0]?.hour || []).map(h => ({
    // h.time === "2025-09-17 11:00"
    timeLocal: h.time?.slice(-5) || "", // "HH:MM"
    temp: h.temp_c,
    // WeatherAPI provides pop-like fields:
    pop: typeof h.chance_of_rain === "number" ? h.chance_of_rain / 100 : (h.will_it_rain ? 0.6 : 0), // normalize to 0..1
    weather: h.condition?.text || ""
  }));

  // Filter 11:00–13:00
  const windowHours = hours.filter(h => h.timeLocal >= "11:00" && h.timeLocal < "13:00");

  const rainLikely = windowHours.some(h => h.pop >= 0.4 || /rain|hujan/i.test(h.weather));

  return {
    date: data?.forecast?.forecastday?.[0]?.date, // "YYYY-MM-DD"
    hours: windowHours,
    rainLikely
  };
}

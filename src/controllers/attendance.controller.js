import mongoose from "mongoose";
import Attendance from "../models/Attendance.js";

/** Helper: normalisasi ke awal hari (UTC) untuk konsistensi unik harian */
function normalizeDateToUTCStart(d) {
  const x = new Date(d || Date.now());
  return new Date(Date.UTC(x.getUTCFullYear(), x.getUTCMonth(), x.getUTCDate()));
}

/** Helper: awal & akhir pekan (Senin-Minggu) dalam UTC */
function getWeekRange(startDate) {
  const d = normalizeDateToUTCStart(startDate || new Date());
  const dow = d.getUTCDay() || 7; // 1..7, Senin=1
  const monday = new Date(d);
  monday.setUTCDate(d.getUTCDate() - (dow - 1));
  const nextMonday = new Date(monday);
  nextMonday.setUTCDate(monday.getUTCDate() + 7);
  return { start: monday, end: nextMonday };
}

/** Create attendance (check-in/initial) */
export const create = async (req, res, next) => {
  try {
    const { childID, date = new Date(), status = "hadir", checkIn } = req.body;
    if (!childID) return res.status(400).json({ msg: "childID required" });

    const normalized = normalizeDateToUTCStart(date);
    const teacherID = req.user?.sub || req.user?._id || req.user?.id;

    const doc = await Attendance.create({
      childID: new mongoose.Types.ObjectId(childID),
      date: normalized,
      status,
      checkIn: status === "hadir" ? (checkIn ? new Date(checkIn) : new Date()) : undefined,
      teacherID,
    });
    res.status(201).json(doc);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(409).json({ msg: "attendance already exists for this child on that date" });
    }
    next(e);
  }
};

/** Update attendance (checkout/status/note) */
export const update = async (req, res, next) => {
  try {
    const patch = { ...req.body };
    if (patch.date) patch.date = normalizeDateToUTCStart(patch.date);
    const row = await Attendance.findByIdAndUpdate(req.params.id, patch, { new: true });
    if (!row) return res.status(404).json({ msg: "not found" });
    res.json(row);
  } catch (e) { next(e); }
};

/** List attendance per child */
export const listByChild = async (req, res, next) => {
  try {
    const { role, childIDs = [] } = req.user || {};
    const { childId } = req.params;

    // orang tua hanya boleh lihat anaknya sendiri
    if (role === "parent" && !childIDs.map(String).includes(String(childId))) {
      return res.status(403).json({ msg: "forbidden" });
    }
    const rows = await Attendance.find({ childID: childId }).sort({ date: -1 });
    res.json(rows);
  } catch (e) { next(e); }
};

/** Weekly recap per child: counts by status + daily rows */
export const recapWeekly = async (req, res, next) => {
  try {
    const { childId } = req.params;
    const { start } = req.query;
    // izin akses parent
    const { role, childIDs = [] } = req.user || {};
    if (role === "parent" && !childIDs.map(String).includes(String(childId))) {
      return res.status(403).json({ msg: "forbidden" });
    }

    const { start: startWeek, end: endWeek } = getWeekRange(start ? new Date(start) : new Date());

    const match = { 
      childID: new mongoose.Types.ObjectId(childId),
      date: { $gte: startWeek, $lt: endWeek }
    };

    const counts = await Attendance.aggregate([
      { $match: match },
      { $group: { _id: "$status", c: { $sum: 1 } } }
    ]);

    const map = { hadir:0, sakit:0, izin:0, alfa:0 };
    counts.forEach(x => { map[x._id] = x.c; });

    const days = await Attendance.find(match).sort({ date: 1 }).lean();

    res.json({
      childId,
      range: { start: startWeek, end: endWeek },
      total: days.length,
      ...map,
      days
    });
  } catch (e) { next(e); }
};
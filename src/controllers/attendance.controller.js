import Attendance from "../models/Attendance.js";
import Child from "../models/child.js";

/** Create attendance (check-in/initial) */
export const create = async (req, res, next) => {
  try {
    const { childID, date = new Date(), status = "hadir", checkIn } = req.body;
    if (!childID) return res.status(400).json({ msg: "childID required" });

    // normalisasi tanggal (00:00 UTC) supaya unik per hari
    const d0 = new Date(date);
    const normalized = new Date(Date.UTC(d0.getUTCFullYear(), d0.getUTCMonth(), d0.getUTCDate()));

    const doc = await Attendance.create({
      childID,
      date: normalized,
      status,
      checkIn: status === "hadir" ? (checkIn ? new Date(checkIn) : new Date()) : undefined,
      teacherID: req.user?.sub || req.user?._id || req.user?.id,
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
    if (patch.date) {
      const d0 = new Date(patch.date);
      patch.date = new Date(Date.UTC(d0.getUTCFullYear(), d0.getUTCMonth(), d0.getUTCDate()));
    }
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

import Broadcast from "../models/Broadcast.js";
import { cacheDelPrefix } from "../middlewares/cache.js";

export const create = async (req, res, next) => {
  try {
    const { title, content, startsAt, expiresAt } = req.body;
    const createdBy = req.user?.sub;
    const row = await Broadcast.create({ title, content, startsAt, expiresAt, createdBy });
    try { await cacheDelPrefix("/api/broadcasts"); } catch (e) { console.warn(e); }
    res.status(201).json(row);
  } catch (e) { next(e); }
};
export const listAll = async (req, res, next) => {
  try {
    const rows = await Broadcast.find().sort({ createdAt: -1 });
    res.json(rows);
  } catch (e) { next(e); }
};
export const listActive = async (req, res, next) => {
  try {
    const now = new Date();
    const rows = await Broadcast.find({
      $and: [
        { $or: [{ startsAt: { $lte: now } }, { startsAt: { $exists: false } }] },
        { $or: [{ expiresAt: { $gte: now } }, { expiresAt: { $exists: false } }] }
      ]
    }).sort({ createdAt: -1 });
    res.json(rows);
  } catch (e) { next(e); }
};

export const update = async (req, res, next) => {
  try {
    const row = await Broadcast.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!row) return res.status(404).json({ msg: "not found" });
    try {
      await cacheDelPrefix(`/api/broadcasts/${row._id}`);
      await cacheDelPrefix("/api/broadcasts");
    } catch (e) { console.warn(e); }
    res.json(row);
  } catch (e) { next(e); }
};

export const remove = async (req, res, next) => {
  try {
    const row = await Broadcast.findByIdAndDelete(req.params.id);
    if (!row) return res.status(404).json({ msg: "not found" });
    try {
      await cacheDelPrefix(`/api/broadcasts/${row._id}`);
      await cacheDelPrefix("/api/broadcasts");
    } catch (e) { console.warn(e); }
    res.status(204).end();
  } catch (e) { next(e); }
};

export const listForTeacher = async (req, res, next) => {
  try {
    // NTR SESUAIKAN
    const rows = await Broadcast.find().sort({ createdAt: -1 });
    res.json(rows);
  } catch (e) {
    next(e);
  }
};

export const listForParent = async (req, res, next) => {
  try {
    // NTR SESUAIKAN
    const rows = await Broadcast.find().sort({ createdAt: -1 });
    res.json(rows);
  } catch (e) {
    next(e);
  }
};

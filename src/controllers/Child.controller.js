// src/controllers/Child.controller.js
import child from "../models/child.js";
import User from "../models/User.js";

// POST /children (admin, teacher)
export const create = async (req, res, next) => {
  try {
    const { name, birthDate, parentID } = req.body;
    if (!name || !birthDate || !parentID) {
      return res.status(400).json({ msg: "name, birthDate, and parentID are required" });
    }
    const parent = await User.findById(parentID).select("role");
    if (!parent || parent.role !== "parent") {
      return res.status(400).json({ msg: "parentID must be a valid parent user" });
    }
    const dup = await child.findOne({ name, birthDate, parentID });
    if (dup) return res.status(409).json({ msg: "Child already exists for this parent" });

    const doc = await child.create({ name, birthDate, parentID });
    res.status(201).json(doc);
  } catch (e) { next(e); }
};

// GET /children (admin, teacher)
export const list = async (req, res, next) => {
  try {
    const rows = await child.find().sort({ createdAt: -1 });
    res.json(rows);
  } catch (e) { next(e); }
};

// GET /children/:id (admin, teacher)
export const detail = async (req, res, next) => {
  try {
    const row = await child.findById(req.params.id);
    if (!row) return res.status(404).json({ msg: "not found" });
    res.json(row);
  } catch (e) { next(e); }
};

// PATCH /children/:id (admin, teacher) — jangan izinkan ubah parentID via PATCH
export const update = async (req, res, next) => {
  try {
    const allowed = ["name", "birthDate"];
    const update = {};
    for (const k of allowed) if (k in req.body) update[k] = req.body[k];

    const row = await child.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!row) return res.status(404).json({ msg: "not found" });
    res.json(row);
  } catch (e) { next(e); }
};

// DELETE /children/:id (admin)
export const remove = async (req, res, next) => {
  try {
    const row = await child.findByIdAndDelete(req.params.id);
    if (!row) return res.status(404).json({ msg: "not found" });
    res.status(204).end();
  } catch (e) { next(e); }
};

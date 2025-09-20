import ActivityChild from "../models/ActivityChild.js";

// orang tua bisa lihat catatan anaknya
// guru bisa lihat catatan anak yang diajar

export const listMine = async (req, res, next) => {
  try {
    const { role, sub: userId, childIDs = [] } = req.user; // gunakan "childIDs" konsisten
    const q = {};

    if (role === "teacher") q.TeacherID = userId;
    else if (role === "parent") q.ChildID = { $in: childIDs };

    // admin: bisa override filter
    if (req.query.ChildID) q.ChildID = req.query.ChildID;

    if (req.query.from || req.query.to) {
      q.Date = {};
      if (req.query.from) q.Date.$gte = new Date(req.query.from);
      if (req.query.to)   q.Date.$lte = new Date(req.query.to);
    }

    const items = await ActivityChild.find(q).sort({ Date: -1 });
    res.json({ data: items });
  } catch (err) {
    next(err);
  }
};

export const detail = async (req, res, next) => {
  try {
    const item = await ActivityChild.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: "not found" });

    // RBAC
    const { role, sub: userId, childIDs = [] } = req.user;

    if (role === "teacher" && item.TeacherID?.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (role === "parent" && !childIDs.map(String).includes(item.ChildID?.toString())) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json({ data: item });
  } catch (err) {
    next(err);
  }
};

//membuat data anak
export const create = async (req, res, next) => {
  try {
    const payload = {
      ChildID: req.body.ChildID,
      TeacherID: req.user.sub,                     // dari JWT
      Activity: req.body.Activity,
      Date: req.body.Date ? new Date(req.body.Date) : new Date(),
      TimeStart: req.body.TimeStart,
      TimeEnd: req.body.TimeEnd,
      AdditionalNotes: req.body.AdditionalNotes
    };

    const item = await ActivityChild.create(payload);
    res.status(201).json({ message: "Created", data: item });
  } catch (err) {
    res.status(400).json({ message: "Gagal buat activity", error: err.message });
  }
};

//mengubah data anak
export const update = async (req, res, next) => {
  try {
    const item = await ActivityChild.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Aktivitas tidak ditemukan" });

    const { role, sub: userId } = req.user;
    if (role === "teacher" && item.TeacherID?.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Batasi field yang boleh diupdate (opsional tapi disarankan)
    const updatable = ["Activity", "Date", "TimeStart", "TimeEnd", "AdditionalNotes"];
    for (const k of updatable) {
      if (k in req.body) item[k] = k === "Date" ? new Date(req.body[k]) : req.body[k];
    }

    await item.save();
    res.json({ message: "Updated", data: item });
  } catch (err) {
    next(err);
  }
};

//menghapus data anak

export const remove = async (req, res, next) => {
  try {
    const item = await ActivityChild.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Aktivitas tidak ditemukan" });

    const { role, sub: userId } = req.user;
    if (role === "teacher" && item.TeacherID?.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await item.deleteOne();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

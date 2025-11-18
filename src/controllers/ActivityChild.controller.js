import ActivityChild from "../models/ActivityChild.js";
import Child from "../models/Child.js";

export const listMyChildrenActivities = async (req, res, next) => {
  try {
    const parentId = req.user.sub;

    const children = await Child.find({ parentID: parentId }).select("_id name");
    const childIds = children.map((c) => c._id);

    if (childIds.length === 0) {
      return res.json({ activities: [] });
    }
    const activities = await ActivityChild.find({
      ChildID: { $in: childIds },
    })
      .populate("ChildID", "name")
      .populate("TeacherID", "name")
      .sort({ Date: -1, TimeStart: -1 });

    res.json({ activities });
  } catch (err) {
    next(err);
  }
};


export const listMine = async (req, res, next) => {
  try {
<<<<<<< Updated upstream
    const { role, sub: userId, childIDs = [] } = req.user; 
    const q = {};

    if (role === "teacher") {
      q.TeacherID = userId;
=======
    const { role, sub: userId, childIDs = [] } = req.user;
    const q = {};

    if (role === "teacher") q.TeacherID = userId;
    else if (role === "parent") {
      const children = await Child.find({ parentID: userId }).select("_id");
      const childIds = children.map((c) => c._id);

      if (childIds.length === 0) {
        return res.json({ data: [] });
      }

      q.ChildID = { $in: childIds };
>>>>>>> Stashed changes
    }

    if (req.query.ChildID) q.ChildID = req.query.ChildID;

    if (req.query.from || req.query.to) {
      q.Date = {};
      if (req.query.from) q.Date.$gte = new Date(req.query.from);
      if (req.query.to)   q.Date.$lte = new Date(req.query.to);
    }

    const items = await ActivityChild.find(q)
      .populate("ChildID", "name")
      .populate("TeacherID", "name")
      .sort({ Date: -1 });

    res.json({ data: items });
  } catch (err) {
    next(err);
  }
};


export const listAll = async (req, res, next) => {
  try {
    const rows = await Attendance.find()
      .populate("childID", "name")
      .populate("teacherID", "name")
      .sort({ date: -1 });

    res.json(rows);
  } catch (e) {
    next(e);
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


//membuat catatan aktivitas anak
export const create = async (req, res, next) => {
  try {
    const allowedActivities = [
      "Senam Pagi",
      "Kegiatan Bermain",
      "Kegiatan Bercerita",
      "Makan Siang",
      "Jam Pulang"
    ];

    if (!allowedActivities.includes(req.body.Activity)) {
      return res.status(400).json({ message: "Activity tidak valid" });
    }

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

//mengubah catatan aktivitas anak
export const update = async (req, res, next) => {
  try {
    const item = await ActivityChild.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Aktivitas tidak ditemukan" });

    const { role, sub: userId } = req.user;
    if (role === "teacher" && item.TeacherID?.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

        const allowedActivities = [
      "Senam Pagi",
      "Kegiatan Bermain",
      "Kegiatan Bercerita",
      "Makan Siang",
      "Jam Pulang"
    ];

    if ("Activity" in req.body && !allowedActivities.includes(req.body.Activity)) {
      return res.status(400).json({ message: "Activity tidak valid" });
    }

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

//menghapus catatan aktivitas anak

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


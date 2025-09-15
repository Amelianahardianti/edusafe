import Feedback from "../models/Feedback.js";

export const create = async (req,res,next)=>{
  try{
    const { message, childID } = req.body;
    const parentID = req.user?.sub;
    if(!message) return res.status(400).json({ msg:"message required" });
    const row = await Feedback.create({ message, childID, parentID });
    res.status(201).json(row);
  } catch(e){ next(e); }
};

export const list = async (req,res,next)=>{
  try{
    const { role, sub } = req.user;
    const q = {};
    if (role === "parent") q.parentID = sub;
    const rows = await Feedback.find(q).sort({ createdAt: -1 });
    res.json(rows);
  } catch(e){ next(e); }
};

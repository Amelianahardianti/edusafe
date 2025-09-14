// src/routes/Child.routes.js
import { Router } from 'express';
import Child from '../models/child.js';
import { authMiddleware, roleRequired } from '../middlewares/authMiddleware.js';

const r = Router();
r.use(authMiddleware);

// Admin/guru boleh buat anak
r.post('/', roleRequired('admin','teacher'), async (req,res,next)=>{
  try {
    const doc = await Child.create(req.body); // {name, parentIDs:[...], ...}
    res.status(201).json(doc);
  } catch(e){ next(e); }
});

r.get('/', roleRequired('admin','teacher'), async (req,res,next)=>{
  try {
    const rows = await Child.find().sort({createdAt:-1});
    res.json(rows);
  } catch(e){ next(e); }
});

r.get('/:id', roleRequired('admin','teacher'), async (req,res,next)=>{
  try {
    const row = await Child.findById(req.params.id);
    if(!row) return res.status(404).json({msg:'not found'});
    res.json(row);
  } catch(e){ next(e); }
});

r.patch('/:id', roleRequired('admin','teacher'), async (req,res,next)=>{
  try {
    const row = await Child.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if(!row) return res.status(404).json({msg:'not found'});
    res.json(row);
  } catch(e){ next(e); }
});

r.delete('/:id', roleRequired('admin'), async (req,res,next)=>{
  try {
    const row = await Child.findByIdAndDelete(req.params.id);
    if(!row) return res.status(404).json({msg:'not found'});
    res.status(204).end();
  } catch(e){ next(e); }
});

export default r;

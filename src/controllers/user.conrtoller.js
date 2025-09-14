import bcrypt from 'bcryptjs';
import user from '../models/User.js';

//GET/api/users? role=teacher/parent
export const getUsers = async (req, res) =>{
  const q = {};
  if (req.query.role)  q.role = req.query.role;
  const rows = await user.find(q).select('-password').sort({ createdAt: -1 });
  res.json(rows);
};


//GET/api/users/:id
export const detail = async (req, res) =>{
  const u = await user.findById(req.params.id).select('-password');
  if(!u) return res.status(404).json({msg: 'not found'});
  res.json(u);
};

//post/api/users (admin membuat user baru)
export const create = async (req, res) =>{
    try {
        const {name, email, password, role} = req.body;
        if(!email) return res.status(400).json({msg: 'email is required'});
        if(!password) return res.status(400).json({msg: 'password is required'});
        const hash = await bcrypt.hash(password, 10);
        const u = await user.create({
            name, email, password: hash, role
        });
        res.status(201).json({id: u._id, id: u.name, email: u.email, role: u.role});
    } catch (error) {
        if(error.code === 11000)
            return res.status(400).json({msg: 'email already exists'});
        }
    };

//patch/api/users/:id (admin mengubah user)
export const update = async (req, res) =>{
    const {name, email, password} = req.body;
    const update ={};
    if(name) update.name = name;
    if(email) update.email = email;
    if(password) update.password = await bcrypt.hash(password, 10);

    const u = await user.findByIdAndUpdate(req.params.id, update, {new: true}).select('-password');
    if(!u) return res.status(404).json({msg: 'not found'});
    res.json(u);
};

//delete/api/users/:id (admin menghapus user)
export const remove = async (req, res) =>{
    const del = await user.findByIdAndDelete(req.params.id);
    if(!del) return res.status(404).json({msg: 'not found'});
    res.json({ok: true});
};
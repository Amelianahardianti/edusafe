import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import { authMiddleware, roleRequired } from "./middlewares/authMiddleware.js";
import ActivityChildRoute from "./routes/ActivityChild.routes.js";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import ChildRoutes from './routes/Child.routes.js';
import ChildAttentanceRoute from './routes/attendance.routes.js';
import BroadcastRoute from './routes/broadcast.routes.js';
import FeedbackRoute from './routes/feedback.routes.js';

dotenv.config();
const api = express();

// middleware
api.use(express.json());
api.use(cors({ origin: true, credentials: true }));
api.use(cookieParser());
api.use(morgan("dev"));

//user route
api.use("/api/users", usersRoute);

//Child route
api.use('/api/children', ChildRoutes);

//Child attendance route
api.use('/api/attendance', ChildAttentanceRoute);

//Broadcast route
api.use('/api/broadcasts', BroadcastRoute);

//Feedback route
api.use('/api/feedbacks', FeedbackRoute);

// test route
api.get("/", (req, res) => res.json({ msg: "API jalan bro" }));

// routes
api.use("/api/auth", authRoute);
api.use("/api/activitychild", ActivityChildRoute);

// cek yang butuh login
api.get("/api/private", authMiddleware, (req, res) => {
  res.json({ msg: "ini halaman private bro" });
});

// cek yang butuh role tertentu
api.get("/api/teacher-only", authMiddleware, roleRequired("teacher"), (req, res) => {
  res.json({ msg: "ini halaman guru doang bro" });
});
api.get("/api/admin-only", authMiddleware, roleRequired("admin"), (req, res) => {
  res.json({ msg: "ini halaman admin doang bro" });
});
api.get("/api/parent-only", authMiddleware, roleRequired("parent"), (req, res) => {
  res.json({ msg: "ini halaman orang tua doang bro" });
});


// connect db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    api.listen(process.env.PORT, () =>
      console.log("API running on port " + process.env.PORT)
    );
  })
  .catch((err) => console.error(err));

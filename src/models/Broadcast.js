import mongoose from "mongoose";

const BroadcastSchema = new mongoose.Schema({
  title:   { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startsAt: { type: Date, default: Date.now },
  expiresAt:{ type: Date }
}, { timestamps: true });

export default mongoose.model("Broadcast", BroadcastSchema);

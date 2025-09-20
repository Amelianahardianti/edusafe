import mongoose from "mongoose";

// ganti birthdate -> birthDate, dan parentID wajib (single)
const Childschema = new mongoose.Schema({
  name: { type: String, required: true },
  birthDate: { type: Date, required: true },
  parentID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

// cegah duplikat anak sama (nama+tanggal lahir) pada parent yang sama
Childschema.index({ name: 1, birthDate: 1, parentID: 1 }, { unique: true });

export default mongoose.model("Child", Childschema);
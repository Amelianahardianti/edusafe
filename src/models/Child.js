import mongoose from "mongoose";

const Childschema = new mongoose.Schema({
    name: { type: String, required: true },
    birthdate: { type: Date, required: true },
    parentID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] },

}, {timestamps: true}
);

export default mongoose.model("Child", Childschema);
import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true, index: true },
    coverImage: { type: String },
    year: { type: Number },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Album", albumSchema);



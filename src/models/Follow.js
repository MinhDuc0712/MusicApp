import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true, index: true },
    createdAt: { type: Date, default: Date.now },
});

followSchema.index({ user: 1, artist: 1 }, { unique: true });

export default mongoose.model("Follow", followSchema);



import mongoose from "mongoose";

const playHistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    song: { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true, index: true },
    playedAt: { type: Date, default: Date.now, index: true },
    device: { type: String },
    ip: { type: String },
});

export default mongoose.model("PlayHistory", playHistorySchema);



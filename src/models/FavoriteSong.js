import mongoose from "mongoose";

const favoriteSongSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    song: {type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true},
    createdAt: { type: Date, default: Date.now },
});

favoriteSongSchema.index({ user: 1, song: 1 }, { unique: true });

export default mongoose.model("FavoriteSong", favoriteSongSchema);



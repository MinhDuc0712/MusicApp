import mongoose from "mongoose";

const playlistItemSchema = new mongoose.Schema({
    song: { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
    addedAt: { type: Date, default: Date.now },
    order: { type: Number, default: 0 },
});

const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    isPublic: { type: Boolean, default: false },
    coverImage: { type: String },
    items: [playlistItemSchema],
    followersCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Playlist", playlistSchema);



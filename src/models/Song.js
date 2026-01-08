import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    songName: {
        type: String,
        required: true,
        trim: true,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
        required: true,
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        required: true,
    },
    year: {
        type: Number,
    },
    url: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

songSchema.index(
    {songName: 1, artist: 1},
    {unique: true}
);

export default mongoose.model("Song", songSchema);
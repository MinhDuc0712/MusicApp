import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    songName: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    album: {
        type: String,
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
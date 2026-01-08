import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true},
    song: {type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true, index: true},
    content: {type: String, required: true, trim: true},
    likesCount: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now},
});

export default mongoose.model("Comment", commentSchema);
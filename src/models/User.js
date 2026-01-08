import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: false,
        unique: false,
    },
    role: {
        type: String,
        enum: ['user', 'artist'],
        default: 'user'
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    avatar: {
        type: String,
    },
});

export default mongoose.model("User", userSchema);
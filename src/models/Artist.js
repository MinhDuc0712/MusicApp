import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true, trim: true },
    bio: { type: String },
    avatar: { type: String },
    socials: {
        facebook: { type: String },
        instagram: { type: String },
        youtube: { type: String },
        tiktok: { type: String },
        website: { type: String },
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Artist", artistSchema);



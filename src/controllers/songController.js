import Song from "../models/Song.js";

export const getSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        if (songs.length === 0) {
            return res.status(404).json({ success: false, message: "Không tìm thấy bài hát" });
        }
        res.status(200).json({ success: true, data: songs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
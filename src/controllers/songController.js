import Song from "../models/Song.js";
export const getSongs = async (req, res) => {
    try {
        const {search} = req.query;
        const query = search
            ? {songName: {$regex: search, $options: "i"}}
            : {};
        const songs = await Song.find(query).sort();
        if (songs.length === 0) {
            return res.status(404).json({ success: false, message: "Không tìm thấy bài hát" });
        }
        res.status(200).json({ success: true, data: songs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const createSong = async (req, res) => {
    try {
        const song = await Song.create(req.body);
        res.status(201).json({success: true, data: song});
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                message: "Bài hát này đã tồn tại cho nghệ sĩ này",
            });
        }
        res.status(500).json({message: "Lỗi server"})
    }
}
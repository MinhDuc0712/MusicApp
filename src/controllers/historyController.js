import PlayHistory from "../models/PlayHistory.js";

export const addToHistory = async (req, res) => {
    try {
        const {songId} = req.body;
        // Cập nhật nếu đã tồn tại (đưa lên đầu lịch sử) hoặc tạo mới
        const history = await PlayHistory.findOneAndUpdate(
            {user: req.user.id, song: songId},
            {playedAt: Date.now()},
            {upsert: true, new: true}
        );
        res.status(200).json({success: true, data: history});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
};

export const getMyHistory = async (req, res) => {
    try {
        const history = await PlayHistory.find({user: req.user.id})
            .populate("song")
            .sort({playedAt: -1})
            .limit(20);
        res.status(200).json({success: true, data: history});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

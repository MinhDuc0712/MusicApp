import FavoriteSong from "../models/FavoriteSong.js";

export const toggleFavorite = async (req, res) => {
    try {
        const {songId} = req.body;
        const userId = req.user._id;

        const existing = await FavoriteSong.findOne({user: userId, song: songId});

        if (existing) {
            await FavoriteSong.findByIdAndDelete(existing._id);
            return res.status(200).json({success: true, message: "Đã xóa khỏi danh sách yêu thích"});
        }

        const favorite = await FavoriteSong.create({user: userId, song: songId});
        res.status(201).json({success: true, data: favorite});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
};

export const getMyFavorites = async (req, res) => {
    try {
        const favorites = await FavoriteSong.find({user: req.user._id}).populate("song");
        res.status(200).json({success: true, data: favorites});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

import Playlist from "../models/Playlist.js";

export const getMyPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({user: req.user.id}).populate("songs");
        res.status(200).json({success: true, data: playlists});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

export const createPlaylist = async (req, res) => {
    try {
        const {name, description, isPublic, coverImage} = req.body;
        const playlist = await Playlist.create({
            name,
            description,
            isPublic,
            coverImage,
            user: req.user.id // Đảm bảo field này khớp với model (user hoặc owner)
        });
        res.status(201).json({success: true, data: playlist});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
};

export const addSongToPlaylist = async (req, res) => {
    try {
        const {id} = req.params;
        const {songId} = req.body;
        const playlist = await Playlist.findOneAndUpdate(
            {_id: id, user: req.user.id},
            {$addToSet: {songs: songId}},
            {new: true}
        );
        if (!playlist) return res.status(404).json({message: "Không tìm thấy playlist"});
        res.status(200).json({success: true, data: playlist});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
};

export const deletePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findOneAndDelete({_id: req.params.id, user: req.user.id});
        if (!playlist) {
            return res.status(404).json({success: false, message: "Không tìm thấy playlist"});
        }
        res.status(200).json({success: true, message: "Xóa playlist thành công"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
};
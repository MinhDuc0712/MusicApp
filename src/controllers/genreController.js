import Genre from "../models/Genre.js";

// GET /api/genres
export const getGenres = async (req, res) => {
    try {
        const genres = await Genre.find().sort({name: 1});
        res.status(200).json({success: true, data: genres});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

// POST /api/genres
export const createGenre = async (req, res) => {
    try {
        const genre = await Genre.create(req.body);
        res.status(201).json({success: true, data: genre});
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({success: false, message: "Tên thể loại hoặc slug đã tồn tại"});
        }
        res.status(400).json({success: false, message: error.message});
    }
};

// DELETE /api/genres/:id
export const deleteGenre = async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);
        if (!genre) return res.status(404).json({success: false, message: "Không tìm thấy thể loại"});
        res.status(200).json({success: true, message: "Xóa thể loại thành công"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
};
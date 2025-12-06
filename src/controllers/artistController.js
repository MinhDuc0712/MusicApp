import Artist from "../models/Artist.js";

export const getArtists = async (req, res) => {
    try {
        const { search } = req.query;
        const query = search
            ? { name: { $regex: search, $options: "i" } }
            : {};
        const artists = await Artist.find(query).sort({ createdAt: -1 });
        if (artists.length === 0) {
            return res.status(404).json({ success: false, message: "Không tìm thấy tên nghệ sĩ" });
        }
        res.status(200).json({ success: true, data: artists });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getArtistById = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res
                .status(404)
                .json({ success: false, message: "Không tìm thấy tên nghệ sĩ" });
        }
        res.status(200).json({ success: true, data: artist });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const createArtist = async (req, res) => {
    try {
        const artist = await Artist.create(req.body);
        res.status(201).json({ success: true, data: artist });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};




export const updateArtist = async (req, res) => {
    try {
        const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!artist) {
            return res
                .status(404)
                .json({ success: false, message: "Không tìm thấy tên nghệ sĩ" });
        }
        res.status(200).json({ success: true, data: artist, message: "Cập nhật nghệ sĩ thành công" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteArtist = async (req, res) => {
    try {
        const artist = await Artist.findByIdAndDelete(req.params.id);
        if (!artist) {
            return res
                .status(404)
                .json({ success: false, message: "Không tìm thấy tên nghệ sĩ" });
        }
        res.status(200).json({ success: true, message: "Xóa nghệ sĩ thành công" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
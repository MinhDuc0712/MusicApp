import Album from "../models/Album.js";

export const getAlbums = async (req, res) => {
    try {
        const {search} = req.query;
        const query = search ? {name: {$regex: search, $options: "i"}} : {};
        const albums = await Album.find(query).sort();
        res.status(200).json({success: true, data: albums});
    } catch {
        res.status(500).json({success: false, message: error.message});
    }
}

export const createAlbum = async (req, res) => {
    try {
        const albums = await Album.create(req.body);
        res.status(201).json({success: true, data: albums});
    } catch (e) {
        res.status(400).json({success: false, message: e.message});
    }
}
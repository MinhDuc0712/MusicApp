import Follow from "../models/Follow.js";

export const toggleFollow = async (req, res) => {
    try {
        const {artistId} = req.body;
        const userId = req.user.id;

        const existingFollow = await Follow.findOne({follower: userId, following: artistId});

        if (existingFollow) {
            await Follow.findByIdAndDelete(existingFollow._id);
            return res.status(200).json({success: true, message: "Đã bỏ theo dõi nghệ sĩ"});
        }

        await Follow.create({follower: userId, following: artistId});
        res.status(201).json({success: true, message: "Đã theo dõi nghệ sĩ"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
};

export const getMyFollowing = async (req, res) => {
    try {
        const following = await Follow.find({follower: req.user.id}).populate("following");
        res.status(200).json({success: true, data: following});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

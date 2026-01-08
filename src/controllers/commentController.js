import Comment from "../models/Comment.js";

export const getCommentsBySong = async (req, res) => {
    try {
        const {songId} = req.params;

        // Tìm tất cả comment thuộc về bài hát này
        const comments = await Comment.find({song: songId})
            .populate("user", "name avatar") // Hiển thị tên và ảnh người comment
            .sort({createdAt: -1});       // Mới nhất xếp trên cùng

        // Nếu chưa có comment, 'comments' sẽ là []
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({message: "Lỗi khi lấy bình luận"});
    }
};

export const createComment = async (req, res) => {
    try {
        const {songId, content} = req.body;

        const newComment = await Comment.create({
            user: req.user.id, // ID lấy từ token (người đang đăng nhập)
            song: songId,
            content: content
        });

        // Trả về comment vừa tạo để Frontend cập nhật luôn vào danh sách mà không cần reload
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({message: "Không thể gửi bình luận"});
    }
};

export const updateComment = async (req, res) => {
    try {
        const {commentId} = await Comment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({success: true, data: commentId, message: "Cập nhật đánh giá thành công"});
    } catch (err) {
        res.status(400).json({message: "Lỗi server"})
    }
};

export const deleteComment = async (req, res) => {
    try {
        const {commentId} = await Comment.findByIdAndDelete(req.params.id, req.body)
        if (!commentId) {
            return res.status(404).json({success: false, message: "Không tìm thấy đánh giá nào"});
        }
        res.status(200).json({success: true, message: "Xóa đánh giá thành công"});
    } catch (e) {
        res.status(400).json({success: false, message: e.message});
    }
}
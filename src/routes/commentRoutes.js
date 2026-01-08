import express from 'express';
import {
    getCommentsBySong,
    createComment,
    updateComment,
    deleteComment
} from "../controllers/commentController.js";

const router = express.Router();

/**
 * @openapi
 * /api/comments/{songId}:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Tìm kiếm comment theo id bài hát
 *     parameters:
 *       - in: path
 *         name: songId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách đánh giá
 *       400:
 *         description: Lỗi xác thực
 *   post:
 *     tags:
 *       - Comments
 *     summary: Tạo đánh giá mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - song
 *               - content
 *             properties:
 *               song:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đánh giá đã được tạo
 *       400:
 *         description: Lỗi xác thực
 *
 */
router.route("/:songId").get(getCommentsBySong).post(createComment);
/**
 * @openapi
 * /api/comments/{id}:
 *   put:
 *     tags:
 *       - Comments
 *     summary: Cập nhật nội dung bình luận
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Xóa bình luận
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.route("/:id").put(updateComment).delete(deleteComment);
export default router;
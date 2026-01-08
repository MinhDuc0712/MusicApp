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
 *     summary: Get comments by song id
 *     parameters:
 *       - in: path
 *         name: songId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Array of comments
 *       400:
 *         description: Validation error
 *   post:
 *     tags:
 *       - Comments
 *     summary: Create comment
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
 *         description: Comment created
 *       400:
 *         description: Validation error
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
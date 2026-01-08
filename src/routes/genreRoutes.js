import express from "express";
import {getGenres, createGenre, deleteGenre} from "../controllers/genreController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @openapi
 * /api/genres:
 *   get:
 *     tags:
 *       - Genres
 *     summary: Lấy danh sách tất cả thể loại
 *     responses:
 *       200:
 *         description: Danh sách thể loại
 *   post:
 *     tags:
 *       - Genres
 *     summary: Tạo thể loại mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Thể loại đã được tạo
 *       400:
 *         description: Lỗi dữ liệu hoặc trùng lặp
 */
router.route("/")
    .get(getGenres)
    .post(protect, createGenre);

/**
 * @openapi
 * /api/genres/{id}:
 *   delete:
 *     tags:
 *       - Genres
 *     summary: Xóa thể loại theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy
 */
router.route("/:id")
    .delete(protect, deleteGenre);

export default router;

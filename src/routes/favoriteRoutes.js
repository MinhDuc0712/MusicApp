import express from "express";
import {toggleFavorite, getMyFavorites} from "../controllers/favoriteController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

/**
 * @openapi
 * /api/favorites:
 *   get:
 *     tags:
 *       - Favorites
 *     summary: Lấy danh sách bài hát yêu thích của tôi
 *     responses:
 *       200:
 *         description: Danh sách bài hát
 *   post:
 *     tags:
 *       - Favorites
 *     summary: Thêm hoặc xóa bài hát khỏi danh sách yêu thích (Toggle)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - songId
 *             properties:
 *               songId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đã xóa khỏi yêu thích
 *       201:
 *         description: Đã thêm vào yêu thích
 */
router.route("/")
    .get(getMyFavorites)
    .post(toggleFavorite);

export default router;
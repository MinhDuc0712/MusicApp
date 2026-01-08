import express from "express";
import {addToHistory, getMyHistory} from "../controllers/historyController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @openapi
 * /api/history:
 *   get:
 *     tags:
 *       - History
 *     summary: Lấy lịch sử nghe nhạc gần đây (tối đa 20 bài)
 *     responses:
 *       200:
 *         description: Danh sách lịch sử nghe nhạc
 *   post:
 *     tags:
 *       - History
 *     summary: Thêm bài hát vào lịch sử nghe nhạc
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
 *         description: Đã cập nhật lịch sử
 */
router.route("/")
    .get(protect, getMyHistory)
    .post(protect, addToHistory);

export default router;

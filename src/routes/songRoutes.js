import express from "express";
import {getSongs, createSong} from "../controllers/songController.js";

const router = express.Router();

/**
 * @openapi
 * /api/songs:
 *   get:
 *     tags:
 *       - Songs
 *     summary: Danh sách bài hát
 *     parameters:
 *       - in: query
 *         name: Tìm kiếm
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tên
 *     responses:
 *       200:
 *         description: Danh sách bài hát
 *       400:
 *          description: Lỗi xác thực
 *   post:
 *     tags:
 *       - Songs
 *     summary: Thêm bài hát
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - songName
 *               - artist
 *               - album
 *             properties:
 *               songName:
 *                 type: string
 *               artist:
 *                 type: string
 *               album:
 *                 type: string
 *               year:
 *                 type: integer
 *               url:
 *                 type: string
 *               coverImage:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bài hát được thêm thành công
 *       400:
 *         description: Lỗi xác thực
 */
router.route("/").get(getSongs).post(createSong);

export default router;
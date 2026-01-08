import express from 'express';
import {getAlbums, createAlbum} from "../controllers/albumController.js";

const router = express.Router();

/**
 * @openapi
 * /api/albums:
 *   get:
 *     tags:
 *       - Albums
 *     summary: Danh sách album
 *     parameters:
 *       - in: query
 *         name: Tìm kiếm
 *         schema:
 *           type: string
 *         description: Tìm kiếm tên
 *     responses:
 *       200:
 *         description: Danh sách album
 *       400:
 *         description: Lỗi xác thực
 *   post:
 *     tags:
 *       - Albums
 *     summary: Tạo albums
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - artist
 *             properties:
 *               title:
 *                 type: string
 *               artist:
 *                 type: string
 *               coverImage:
 *                 type: string
 *               year:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Album đã được tạo
 *       400:
 *         description: Lỗi xác thực
 */
router.route("/").get(getAlbums).post(createAlbum);
export default router;
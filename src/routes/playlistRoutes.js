import express from "express";
import {
    getMyPlaylists,
    createPlaylist,
    addSongToPlaylist,
    deletePlaylist
} from "../controllers/playlistController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // Tất cả playlist actions cần login

/**
 * @openapi
 * /api/playlists:
 *   get:
 *     tags:
 *       - Playlists
 *     summary: Lấy danh sách playlist của người dùng hiện tại
 *     responses:
 *       200:
 *         description: Danh sách playlist
 *   post:
 *     tags:
 *       - Playlists
 *     summary: Tạo playlist mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *               coverImage:
 *                 type: string
 *     responses:
 *       201:
 *         description: Playlist đã được tạo
 */
router.route("/")
    .get(getMyPlaylists)
    .post(createPlaylist);

/**
 * @openapi
 * /api/playlists/{id}:
 *   delete:
 *     tags:
 *       - Playlists
 *     summary: Xóa playlist
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
router.route("/:id")
    .delete(deletePlaylist);

/**
 * @openapi
 * /api/playlists/{id}/songs:
 *   post:
 *     tags:
 *       - Playlists
 *     summary: Thêm bài hát vào playlist
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *         description: Đã thêm bài hát
 */
router.post("/:id/songs", addSongToPlaylist);

export default router;
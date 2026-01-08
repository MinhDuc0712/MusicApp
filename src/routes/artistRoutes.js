import express from "express";
import {
    getArtists,
    createArtist,
    getArtistById,
    updateArtist,
    deleteArtist,
} from "../controllers/artistController.js";


const router = express.Router();

/**
 * @openapi
 * /api/artists:
 *   get:
 *     tags:
 *       - Artists
 *     summary: Danh sách nghệ sĩ
 *     parameters:
 *       - in: query
 *         name: Tìm kiếm
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tên
 *     responses:
 *       200:
 *         description: Danh sách nghệ sĩ
 *       400:
 *         description: Lỗi xác thực
 *   post:
 *     tags:
 *       - Artists
 *     summary: Tạo nghệ sĩ
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
 *               bio:
 *                 type: string
 *               avatar:
 *                 type: string
 *               socials:
 *                 type: object
 *                 properties:
 *                   facebook:
 *                     type: string
 *                   instagram:
 *                     type: string
 *                   youtube:
 *                     type: string
 *                   tiktok:
 *                     type: string
 *                   website:
 *                     type: string
 *     responses:
 *       201:
 *         description: Nghệ sĩ đã được tạo
 *       400:
 *         description: Lỗi xác thực
 */
router.route("/")
    .get(getArtists)
    .post(createArtist);

/**
 * @openapi
 * /api/artists/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: ID nghệ sĩ
 *   get:
 *     tags:
 *       - Artists
 *     summary: Tìm nghệ sĩ theo id
 *     responses:
 *       200:
 *         description: Tìm thấy nghệ sĩ theo ID
 *       404:
 *         description: Không tìm thấy nghệ sĩ
 *   put:
 *     tags:
 *       - Artists
 *     summary: Cập nhật thông tin nghệ sĩ
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
 *               bio:
 *                 type: string
 *               avatar:
 *                 type: string
 *               socials:
 *                 type: object
 *                 properties:
 *                   facebook:
 *                     type: string
 *                   instagram:
 *                     type: string
 *                   youtube:
 *                     type: string
 *                   tiktok:
 *                     type: string
 *                   website:
 *                     type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Lỗi xác thực
 *       404:
 *         description: Không tìm thấy nghệ sĩ nào
 *   delete:
 *     tags:
 *       - Artists
 *     summary: Xóa thông tin nghệ sĩ
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy nghệ sĩ nào
 */
router.route("/:id")
    .get(getArtistById)
    .put(updateArtist)
    .delete(deleteArtist);

export default router;

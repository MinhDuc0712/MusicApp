import express from "express";
import {toggleFollow, getMyFollowing} from "../controllers/followController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @openapi
 * /api/follows:
 *   get:
 *     tags:
 *       - Follows
 *     summary: Lấy danh sách nghệ sĩ bạn đang theo dõi
 *     responses:
 *       200:
 *         description: Danh sách nghệ sĩ
 *   post:
 *     tags:
 *       - Follows
 *     summary: Theo dõi hoặc bỏ theo dõi một nghệ sĩ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - artistId
 *             properties:
 *               artistId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đã bỏ theo dõi
 *       201:
 *         description: Đã theo dõi thành công
 */
router.route("/")
    .get(protect, getMyFollowing)
    .post(protect, toggleFollow);

export default router;

import express from "express";
import {getSongs, createSong} from "../controllers/songController.js";

const router = express.Router();

/**
 * @openapi
 * /api/songs:
 *   get:
 *     tags:
 *       - Songs
 *     summary: List song
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Optional case-insensitive name search
 *     responses:
 *       200:
 *         description: Array of songs
 *       400:
 *          description: Validation error
 *   post:
 *     tags:
 *       - Songs
 *     summary: Create song
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
 *         description: Song created
 *       400:
 *         description: Validation error
 */
router.route("/").get(getSongs).post(createSong);

export default router;
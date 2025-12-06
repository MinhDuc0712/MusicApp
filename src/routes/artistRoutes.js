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
 *     summary: List artists
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Optional case-insensitive name search
 *     responses:
 *       200:
 *         description: Array of artists
 *       400:
 *         description: Validation error
 *   post:
 *     tags:
 *       - Artists
 *     summary: Create artist
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
 *         description: Artist created
 *       400:
 *         description: Validation error
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
 *       description: Artist MongoDB id
 *   get:
 *     tags:
 *       - Artists
 *     summary: Get artist by id
 *     responses:
 *       200:
 *         description: Artist document
 *       404:
 *         description: Artist not found
 *   put:
 *     tags:
 *       - Artists
 *     summary: Update artist
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
 *         description: Updated artist
 *       400:
 *         description: Validation error
 *       404:
 *         description: Artist not found
 *   delete:
 *     tags:
 *       - Artists
 *     summary: Delete artist
 *     responses:
 *       200:
 *         description: Deletion success message
 *       404:
 *         description: Artist not found
 */
router.route("/:id")
    .get(getArtistById)
    .put(updateArtist)
    .delete(deleteArtist);

export default router;

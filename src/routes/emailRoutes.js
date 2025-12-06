import express from "express";
import { sendOtp, verifyOtp } from "../controllers/authController.js";


const router = express.Router();

/**
 * @openapi
 * /api/email/send-otp:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Send OTP to email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email 
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Missing email or validation error
 */
router.post("/send-otp", sendOtp);

/**
 * @openapi
 * /api/email/verify-otp:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Verify OTP and return token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP valid, token returned
 *       400:
 *         description: Invalid OTP or expired
 */
router.post("/verify-otp", verifyOtp);

export default router;

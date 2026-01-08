import express from "express";
import passport from "../config/passport.js";
import {checkDevice, sendOtp, verifyOtp} from "../controllers/authController.js";


const router = express.Router();

/**
 * @openapi
 * /api/auth/send-otp:
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
 * /api/auth/verify-otp:
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

/**
 * @openapi
 * /api/auth/check-device:
 *   post:
 *     tags: [Auth]
 *     summary: Kiểm tra thiết bị cũ/mới để quyết định phương thức đăng nhập
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               deviceId: { type: string }
 *     responses:
 *       200:
 *         description: Trả về Func cần thực hiện (Login hoặc SendOTP)
 */
router.post("/check-device", checkDevice);

// Bắt đầu xác thực Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Xử lý callback từ Google
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), (req, res) => {
    // Sau khi xác thực thành công, trả về thông tin user hoặc JWT
    res.json({ success: true, user: req.user });
});

export default router;

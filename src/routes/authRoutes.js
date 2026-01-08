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
 *     summary: Gửi mã OTP về Email
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
 *         description: OTP đã được gửi thành công
 *       400:
 *         description: Không đúng email hoặc lỗi xác thực
 */
router.post("/send-otp", sendOtp);

/**
 * @openapi
 * /api/auth/verify-otp:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Kiểm tra OTP và trả về token JWT
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
 *         description: OTP hợp lệ, trả về token JWT
 *       400:
 *         description: OTP không hợp lệ hoặc OTP hết hạn
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

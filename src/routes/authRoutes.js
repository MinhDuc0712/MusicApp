import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

// Bắt đầu xác thực Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Xử lý callback từ Google
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), (req, res) => {
    // Sau khi xác thực thành công, trả về thông tin user hoặc JWT
    res.json({ success: true, user: req.user });
});

export default router;

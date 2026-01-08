import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import DeviceSession from "../models/DeviceSession.js";

export const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const session = await DeviceSession.findOne({user: decoded.id, token: token});
            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "Tài khoản của bạn đã được đăng nhập từ một thiết bị khác."
                });
            }
            req.user = await User.findById(decoded.id).select("-password");
            if (!req.user) {
                return res.status(401).json({success: false, message: "Người dùng không tồn tại"});
            }
            next();
        } else {
            res.status(401).json({success: false, message: "Bạn chưa đăng nhập"});
        }
    } catch (error) {
        res.status(401).json({success: false, message: "Token không hợp lệ hoặc đã hết hạn"});
    }
};
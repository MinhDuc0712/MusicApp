import User from "../models/User.js";
import jwt from "jsonwebtoken";

import nodemailer from "nodemailer";
//Tạo token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//Đăng nhập bằng tài khoản google
    const otpStore = {};

// Gửi OTP qua email
export const sendOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email là bắt buộc" });
    // Sinh mã OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // 5 phút

    // Gửi email
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: "Mã OTP đăng nhập My Music App",
        text: `Mã OTP của bạn là: ${otp}. Mã sẽ hết hiệu lực sau 5 phút`,
    };
    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Đã gửi mã OTP" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Gửi mã OTP thất bại" });
    }
};
// Xác thực OTP và đăng nhập
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const record = otpStore[email];
    console.log("Xác thực OTP:", { email, otp, record });
    if (!record || record.otp !== String(otp) || record.expires < Date.now()) {
        return res.status(400).json({ success: false, message: "OTP không hợp lệ hoặc đã hết hạn" });
    }
    // Xóa OTP sau khi dùng
    delete otpStore[email];
    // Tìm hoặc tạo user
    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({ email });
    }
    const token = createToken(user._id);
    res.json({ success: true, message: "Đăng nhập thành công", token });
};
export const googleLogin = async (req, res) => {
    try {
        const { email, name } = req.body;
        //Kiểm tra user đã tồn tại chưa
        const user = await User.findOne({ email });
        if (user) {
            //Nếu tồn tại thì trả về token
            const token = createToken(user._id);
            res.status(200).json({ success: true, message: "Đăng nhập thành công", token })
        } else {
            //Nếu chưa tồn tại thì tạo mới user và trả về token
            const newUser = new User({
                name: name,
                email
            })
            await newUser.save();
            const token = createToken(newUser._id);
            res.status(200).json({ success: true, message: "Đăng nhập thành công", token })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//Kiểm tra token
export const checkToken = (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: "Token không hợp lệ" })
            } else {
                return res.status(200).json({ success: true, message: "Token hợp lệ" })
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
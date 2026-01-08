import User from "../models/User.js";
import DeviceSession from "../models/DeviceSession.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";

const otpStore = {};

// Tạo Token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '7d'});
};

// Kiểm tra thiết bị (Giao điểm quyết định luồng UI)
export const checkDevice = async (req, res) => {
    try {
        const {email, deviceId} = req.body;
        if (!email || !deviceId) {
            return res.status(400).json({success: false, message: "Thiếu thông tin email hoặc deviceId"});
        }

        const user = await User.findOne({email});

        // Nếu user chưa tồn tại hoặc thiết bị chưa từng đăng nhập
        const session = user ? await DeviceSession.findOne({user: user._id, deviceId}) : null;

        if (session) {
            // Thiết bị cũ -> Trả về Login để Frontend hiện màn hình nhập mật khẩu
            return res.status(200).json({
                success: true,
                Func: "Login",
                message: "Thiết bị quen thuộc"
            });
        } else {
            // Thiết bị mới -> Trả về SendOTP để Frontend tự động kích hoạt gửi mã
            return res.status(200).json({
                success: true,
                Func: "SendOTP",
                message: "Thiết bị mới cần xác thực"
            });
        }
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

// Gửi OTP (Sử dụng Email + Mili giây)
export const sendOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email là bắt buộc" });

    // Sinh mã OTP từ Hash (Email + Time) để tăng độ bảo mật
    const timestamp = Date.now().toString();
    const hash = crypto.createHash('sha256').update(email + timestamp).digest('hex');
    const otp = (parseInt(hash.substring(0, 8), 16) % 900000 + 100000).toString();

    otpStore[email] = {otp, expires: Date.now() + 5 * 60 * 1000};

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: `"My Music App" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Mã xác minh đăng nhập của bạn`,
        html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: #2ecc71; margin: 0;">Xác nhận đăng nhập</h2>
                <p style="color: #777; font-size: 14px;">Vui lòng sử dụng mã dưới đây để hoàn tất đăng nhập vào My Music App</p>
            </div>

            <div style="background-color: #f4f7f6; padding: 30px; text-align: center; border-radius: 8px;">
                <span style="font-size: 40px; font-weight: bold; color: #333; letter-spacing: 8px; display: block;">${otp}</span>
            </div>

            <div style="margin-top: 25px; font-size: 13px; color: #888; text-align: center; line-height: 1.5;">
                <p>Mã này có hiệu lực trong vòng <b>5 phút</b>.</p>
                <p>Nếu không phải bạn đang thực hiện yêu cầu này, hãy bỏ qua email này hoặc liên hệ bộ phận hỗ trợ.</p>
            </div>

            <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;">
            
            <div style="text-align: center; font-size: 12px; color: #bbb;">
                <p>Đây là email tự động, vui lòng không phản hồi.</p>
                <p>&copy; 2026 My Music App</p>
            </div>
        </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Đã gửi mã OTP" });
    } catch (err) {
        res.status(500).json({success: false, message: "Gửi mail thất bại"});
    }
};

// Xác thực OTP & Lưu thiết bị tin tưởng
export const verifyOtp = async (req, res) => {
    const {email, otp, deviceId, deviceModel} = req.body;

    const record = otpStore[email];
    if (!record || record.otp !== otp || Date.now() > record.expires) {
        return res.status(400).json({success: false, message: "Mã OTP không đúng hoặc hết hạn"});
    }

    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({email, role: 'user'});
    }

    // Đánh dấu thiết bị này là tin tưởng
    await DeviceSession.findOneAndUpdate(
        {user: user._id, deviceId},
        {deviceModel, lastLogin: Date.now()},
        {upsert: true}
    );

    delete otpStore[email];
    const token = createToken(user._id);

    res.json({success: true, token, role: user.role});
};

// Đăng nhập google
export const googleLogin = async (req, res) => {
    try {
        const {email, name} = req.body;
        //Kiểm tra user đã tồn tại chưa
        const user = await User.findOne({email});
        if (user) {
            //Nếu tồn tại thì trả về token
            const token = createToken(user._id);
            res.status(200).json({success: true, message: "Đăng nhập thành công", token})
        } else {
            //Nếu chưa tồn tại thì tạo mới user và trả về token
            const newUser = new User({
                name: name,
                email
            })
            await newUser.save();
            const token = createToken(newUser._id);
            res.status(200).json({success: true, message: "Đăng nhập thành công", token})
        }
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

// Kiểm tra token
export const checkToken = (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (err) {
                return res.status(401).json({success: false, message: "Token không hợp lệ"})
            } else {
                return res.status(200).json({success: true, message: "Token hợp lệ"})
            }
        })
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}


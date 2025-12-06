import express from "express";
import {connectDB} from "./src/config/db.js";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./src/config/passport.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import authRouter from "./src/routes/authRoutes.js";
import emailRouter from "./src/routes/emailRoutes.js";
import artistRouter from "./src/routes/artistRoutes.js";
// import songRouter from "./src/routes/songRoutes.js";

dotenv.config();
const PORT = process.env.PORT;
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My Music App API",
            version: "1.0.0",
            description: "API documentation for My Music App backend.",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
            {
                url: `https://s1v081lr-8080.asse.devtunnels.ms`,
            }
        ],
    },
    apis: ["./src/routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
const app = express();
app.use(express.json());

// Cấu hình session cho passport
app.use(session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route xác thực Google
app.use("/api/auth", authRouter);

// Route gửi và xác thực OTP qua email
app.use("/api/email", emailRouter);

// Route quản lý nghệ sĩ
app.use("/api/artists", artistRouter);

// Route quản lý bài hát
// app.use("/api/songs", songRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server đang chạy ở cổng " + PORT);
    });
});
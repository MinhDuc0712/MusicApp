import express from "express";
import {connectDB} from "./src/config/db.js";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./src/config/passport.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import authRouter from "./src/routes/authRoutes.js";
import artistRouter from "./src/routes/artistRoutes.js";
import albumRouter from "./src/routes/albumRoutes.js";
import commentRouter from "./src/routes/commentRoutes.js";
import favoriteRouter from "./src/routes/favoriteRoutes.js";
import followRouter from "./src/routes/followRoutes.js";
import genreRouter from "./src/routes/genreRoutes.js";
import historyRouter from "./src/routes/historyRoutes.js";
import playlistRouter from "./src/routes/playlistRoutes.js";
import songRouter from "./src/routes/songRoutes.js";

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

// Route quản lý nghệ sĩ
app.use("/api/artists", artistRouter);

// Route quản lý album
app.use("/api/albums", albumRouter);

// Route bình luận
app.use("/api/comments", commentRouter);

// Route bài hát yêu thích
app.use("/api/favorites", favoriteRouter);

// Route theo dõi
app.use("/api/follows", followRouter);

// Route thể loại
app.use("/api/genres", genreRouter);

// Route lịch sử nghe
app.use("/api/history", historyRouter);

// Route playlist
app.use("/api/playlists", playlistRouter);

// Route quản lý bài hát
app.use("/api/songs", songRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server đang chạy ở cổng " + PORT);
    });
});
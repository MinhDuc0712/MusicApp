import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("CSDL kết nối thành công");
    } catch (error) {
        console.error("Kết nối CSDL thất bại:", error.message);
        process.exit(1);
    }
}
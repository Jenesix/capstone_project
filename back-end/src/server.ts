// import zone
import express from "express";
import { PORT, MONGO_URI } from "./config/config";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import userRouter from "./routers/userRouter";
// import adminRouter from "./routers/adminRouter";
import multer from "multer";



const app = express();
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
    }
));
app.use(cookieParser());
app.use(express.json());
app.get("/", async (req, res) => {
    res.send({ message: "test server.js" });
});

const multerMid = multer({
    storage: multer.memoryStorage(),
});
app.use(multerMid.single("file"));



// router zone
// app.use("/api/user", userRouter);
// app.use("/api/admin", adminRouter);



app.listen(PORT, async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`Server is running at http://localhost:${PORT}`);
    } catch (error) {
        console.log("error : ", error);
    }
});

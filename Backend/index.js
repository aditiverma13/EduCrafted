import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./route/authRoutes.js";
import formRouter from "./route/formRoutes.js";

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

// ✅ Fix: Allow all localhost origins (5173, 5174, 5175, etc.)
app.use(
  cors({
    origin: [/http:\/\/localhost:\d+$/], // regex to allow any localhost port
    credentials: true,
  })
);

// middleware
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api/auth", authRouter);
app.use("/api/forms", formRouter);

// test route
app.get("/", (req, res) => {
  res.send("Hello from Server");
});

// start server
app.listen(port, () => {
  console.log(`✅ Server started on port ${port}`);
  connectDB();
});


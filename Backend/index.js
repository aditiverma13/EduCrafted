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

// ✅ CORS: allow deployed frontend + any localhost port
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://educrafted-lqly.onrender.com",
      ];
      // allow any localhost port
      if (origin?.startsWith("http://localhost:")) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ✅ Middleware
app.use(cookieParser());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/forms", formRouter);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Hello from Server");
});

// ✅ Start server + connect to DB
connectDB()
  .then(() => {
    app.listen(port, () =>
      console.log(`✅ Server started on port ${port}`)
    );
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err);
  });



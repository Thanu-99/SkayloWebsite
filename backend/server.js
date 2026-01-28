import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoute from "./routes/product.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());

// Debug env
console.log("MONGO_URI =", process.env.MONGO_URI ? "FOUND" : "MISSING");

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed");
    console.error(err.message);
  });

// Routes
app.use("/product", productRoute);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);

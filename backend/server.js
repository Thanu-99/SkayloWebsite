import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoute from "./routes/product.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // You can restrict origin later
app.use(express.json());

// MongoDB connection
mongoose.set("strictQuery", false); // avoids deprecation warnings
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/product", productRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

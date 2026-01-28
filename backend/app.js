import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// 🔥 IMPORTANT: exact path
import productRoutes from "./routes/product.js";

console.log("🔥 app.js file loaded");

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 🔥 THIS MUST RUN
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Backend OK");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

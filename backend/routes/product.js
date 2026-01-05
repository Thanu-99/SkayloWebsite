import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET /product/:name
router.get("/:name", async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.params.name });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Export default so server.js import works
export default router;

import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// When user scans → store in DB
router.post("/scan", async (req, res) => {
  try {
    const { barcode, name, calories, fat, ingredients } = req.body;

    let product = await Product.findOne({ barcode });

    if (!product) {
      product = new Product({
        barcode,
        name,
        calories,
        fat,
        ingredients
      });

      await product.save();
    }

    res.json({ success: true, product });
  } catch (err) {
    console.error(err);
  }
});

// Get product details
router.get("/:barcode", async (req, res) => {
  const product = await Product.findOne({ barcode: req.params.barcode });
  res.json(product);
});

export default router;

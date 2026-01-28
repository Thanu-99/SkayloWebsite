import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// TEST NAME SEARCH ONLY
router.get("/name/:name", async (req, res) => {
  const name = req.params.name;
  

  const product = await Product.findOne({
  name: { $regex: name, $options: "i" }
});


  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

export default router;

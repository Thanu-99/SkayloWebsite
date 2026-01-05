import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: Number,
  riskLevel: String,
  avoidFor: [String],
  burnTime: Number,
  ingredients: [String],
  notes: String
});

export default mongoose.model("Product", ProductSchema);

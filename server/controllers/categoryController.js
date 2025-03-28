const mongoose = require("mongoose");

// ✅ Define Dynamic Schema for Categories
const categorySchema = new mongoose.Schema({}, { strict: false });
const Category = mongoose.model("Category", categorySchema, "categories");

// ✅ Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json({ categories });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Error fetching categories" });
  }
};

module.exports = { getAllCategories };

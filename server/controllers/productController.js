const mongoose = require("mongoose");

// ✅ Fetch collection directly from MongoDB Atlas
const getCategories = async (req, res) => {
  try {
    const db = mongoose.connection.db; // Get MongoDB database connection
    const categories = await db.collection("categories").find({}).toArray(); // Get data from 'categories'
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const db = mongoose.connection.db;
    const product = await db.collection("products").findOne({ _id: new mongoose.Types.ObjectId(productId) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

module.exports = { getCategories, getProductById };

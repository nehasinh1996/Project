const mongoose = require("mongoose");

// ✅ Fetch all categories
const getCategories = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const categories = await db.collection("categories").find({}).toArray();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// ✅ Fetch all products
const getAllProducts = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const products = await db.collection("products").find({}).toArray();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// ✅ Fetch single product by ID
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

module.exports = { getCategories, getAllProducts, getProductById };

const mongoose = require("mongoose");

// ✅ Define Dynamic Schema for Categories
const categorySchema = new mongoose.Schema({}, { strict: false });
const Category = mongoose.model("Category", categorySchema, "categories");

// ✅ Get product by ID
const getProductById = async (req, res) => {
  const productId = req.params.productId;

  try {
    const categories = await Category.find({});
    let foundProduct = null;

    // ✅ Search through categories, subcategories, and products
    categories.forEach((category) => {
      category.subcategories?.forEach((subcategory) => {
        subcategory.products?.forEach((product) => {
          if (product._id == productId) {
            foundProduct = product;
          }
        });
      });
    });

    if (foundProduct) {
      res.json(foundProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Error fetching product" });
  }
};

module.exports = { getProductById };

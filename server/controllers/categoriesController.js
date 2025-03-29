const { getDB } = require("../config/db");

const getCategories = async (req, res) => {
  try {
    const db = getDB();
    if (!db) {
      return res.status(500).json({ message: "Database connection not available" });
    }

    const categoriesCollection = db.collection("product"); // Your collection name
    const categories = await categoriesCollection.find({}, { projection: { category_name: 1, _id: 0 } }).toArray();

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.json(categories);
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { getCategories };

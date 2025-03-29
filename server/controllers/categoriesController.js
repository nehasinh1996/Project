const { getDB } = require("../config/db");

const getCategories = async (req, res) => {
  try {
    const db = getDB();
    const categoriesCollection = db.collection("product"); // Your collection name
    const categories = await categoriesCollection.find({}, { projection: { category_name: 1, _id: 0 } }).toArray();
    
    res.json(categories);
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getCategories };

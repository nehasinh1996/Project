// controllers/categoryController.js
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;

const getCategories = async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();

    const database = client.db("SORA_DB");
    const collection = database.collection("product");

    // Fetch categories with subcategories and products
    const categories = await collection.find({}).toArray();

    res.json({ categories });
    await client.close();
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

module.exports = { getCategories };

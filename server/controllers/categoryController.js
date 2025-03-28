const mongoose = require("mongoose");

const getCategories = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const categories = await db.collection("categories").find({}).toArray();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

module.exports = { getCategories };

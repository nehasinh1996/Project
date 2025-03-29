const mongoose = require("mongoose");

const getProducts = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const products = await db.collection("products").find({}).toArray();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

module.exports = { getProducts };

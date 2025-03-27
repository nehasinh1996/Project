const mongoose = require("mongoose");

const getBanners = async (_, res) => {
  try {
    const data = await mongoose.connection.db.collection("banners").find().toArray();
    res.json({ banners: data });
  } catch (error) {
    console.error("❌ Error fetching banners:", error);
    res.status(500).json({ error: "Failed to fetch banners" });
  }
};

module.exports = { getBanners };

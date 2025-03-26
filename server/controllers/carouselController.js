const mongoose = require("mongoose");

const getCarouselImages = async (_, res) => {
  try {
    const data = await mongoose.connection.db.collection("carouselImages").find().toArray();
    res.json({ images: data[0]?.images || [] });
  } catch (error) {
    console.error("❌ Error fetching carousel images:", error);
    res.status(500).json({ error: "Failed to fetch carousel images" });
  }
};

module.exports = { getCarouselImages };

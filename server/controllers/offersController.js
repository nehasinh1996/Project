const mongoose = require("mongoose");

const getOffers = async (_, res) => {
  try {
    const data = await mongoose.connection.db.collection("offers").find().toArray();
    res.json({ offers: Array.isArray(data[0]?.offers) ? data[0].offers : data });
  } catch (error) {
    console.error("❌ Error fetching offers:", error);
    res.status(500).json({ error: "Failed to fetch offers" });
  }
};

module.exports = { getOffers };

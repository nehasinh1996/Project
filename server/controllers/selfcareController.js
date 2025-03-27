const mongoose = require("mongoose");

const getSelfcareCollections = async (_, res) => {
  try {
    const data = await mongoose.connection.db.collection("selfcare").find().toArray();
    res.json({ collections: data });
  } catch (error) {
    console.error("❌ Error fetching selfcare collections:", error);
    res.status(500).json({ error: "Failed to fetch collections" });
  }
};

module.exports = { getSelfcareCollections };

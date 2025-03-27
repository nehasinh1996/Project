const mongoose = require("mongoose");

const getSelfCareItems = async (_, res) => {
  try {
    const data = await mongoose.connection.db.collection("selfcare").find().toArray();
    res.json({ selfCareItems: data });
  } catch (error) {
    console.error("❌ Error fetching self-care items:", error);
    res.status(500).json({ error: "Failed to fetch self-care items" });
  }
};

module.exports = { getSelfCareItems };

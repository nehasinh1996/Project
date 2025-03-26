const mongoose = require("mongoose");

const getTestimonials = async (_, res) => {
  try {
    const data = await mongoose.connection.db.collection("testimonials").find().toArray();
    res.json({ testimonials: data });
  } catch (error) {
    console.error("❌ Error fetching testimonials:", error);
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
};

module.exports = { getTestimonials };

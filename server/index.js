require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow both local & deployed frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("🔥 Connected to MongoDB Atlas"))
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit if MongoDB fails to connect
  });

// ✅ API Route - Get Offers
app.get("/api/offers", async (_, res) => {
  try {
    const data = await mongoose.connection.db.collection("offers").find().toArray();
    res.json({ offers: Array.isArray(data[0]?.offers) ? data[0].offers : data });
  } catch (error) {
    console.error("❌ Error fetching offers:", error);
    res.status(500).json({ error: "Failed to fetch offers" });
  }
});

// ✅ API Route - Get Testimonials
app.get("/api/testimonials", async (_, res) => {
  try {
    const data = await mongoose.connection.db.collection("testimonials").find().toArray();
    res.json({ testimonials: data });
  } catch (error) {
    console.error("❌ Error fetching testimonials:", error);
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

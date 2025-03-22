require("dotenv").config(); // ✅ Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("🔥 Connected to MongoDB Atlas"))
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

// ✅ Dynamic API Route for Any Collection
// ✅ Endpoint to get offers
app.get("/api/offers", async (req, res) => {
  try {
    const data = await mongoose.connection.db
      .collection("offers")
      .find()
      .toArray();

    // If the collection contains an array of offers
    if (data.length === 1 && Array.isArray(data[0].offers)) {
      res.json({ offers: data[0].offers });
    } else {
      res.json({ offers: data });
    }
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to fetch offers" });
  }
});


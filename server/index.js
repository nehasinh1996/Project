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
app.get("/api/:collection", async (req, res) => {
  const { collection } = req.params;
  try {
    const data = await mongoose.connection.db
      .collection(collection)
      .find()
      .toArray();

    // ✅ If the collection has only 1 document with an array, return the array directly
    if (data.length === 1 && Array.isArray(data[0].offers)) {
      res.json({ offers: data[0].offers }); // Extract offers directly
    } else {
      res.json({ [collection]: data });
    }
  } catch (error) {
    res.status(500).json({ error: `❌ Failed to fetch ${collection}` });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

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

// ✅ Connect to MongoDB Atlas (No Deprecated Options)
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("🔥 Connected to MongoDB Atlas"))
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

// ✅ Endpoint to get offers
app.get("/api/offers", async (_, res) => {  // Use `_` instead of `req`
  try {
    const data = await mongoose.connection.db.collection("offers").find().toArray();
    res.json({ offers: data.length === 1 && Array.isArray(data[0].offers) ? data[0].offers : data });
  } catch (error) {
    console.error("❌ Error fetching offers:", error);
    res.status(500).json({ error: "❌ Failed to fetch offers" });
  }
});


// ✅ Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

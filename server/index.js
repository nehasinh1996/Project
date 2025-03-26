require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const offersRoutes = require("./routes/offers");
const testimonialsRoutes = require("./routes/testimonials");
const carouselRoutes = require("./routes/carousel");
const collectionsRoutes = require("./routes/collections"); 


const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));

// ✅ Connect to MongoDB
connectDB();

// ✅ API Routes
app.use("/api/offers", offersRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/carouselImages", carouselRoutes);
app.use("/api/collections", collectionRoutes);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

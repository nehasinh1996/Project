require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const offersRoutes = require("./routes/offers");
const testimonialsRoutes = require("./routes/testimonials");
const carouselRoutes = require("./routes/carousel");
const selfcareRoutes = require("./routes/selfcare");
const bannerRoutes = require("./routes/banner");
const categoryRoutes = require("./routes/categories"); // ✅ Added category API
const productRoutes = require("./routes/products"); // ✅ Added product API

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
app.use("/api/selfcare", selfcareRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/categories", categoryRoutes); // ✅ Added categories route
app.use("/api/products", productRoutes); // ✅ Added products route

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

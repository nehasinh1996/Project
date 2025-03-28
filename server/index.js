require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const offersRoutes = require("./routes/offers");
const testimonialsRoutes = require("./routes/testimonials");
const carouselRoutes = require("./routes/carousel");
const selfcareRoutes = require("./routes/selfcare");
const bannerRoutes = require("./routes/banner");
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");

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
app.use("/api/carousel", carouselRoutes);
app.use("/api/selfcare", selfcareRoutes);
app.use("/api/banners", bannerRoutes); // ✅ Changed to plural for consistency
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// ✅ Root Route (Optional - To check if server is running)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

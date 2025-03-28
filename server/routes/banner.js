const express = require("express");
const router = express.Router();
const { getBanners, getBannerByCategory } = require("../controllers/bannerController");

// ✅ Route to get all banners
router.get("/", getBanners);

// ✅ Route to get banner by category, subcategory, or product name
router.get("/:target", getBannerByCategory);

module.exports = router;

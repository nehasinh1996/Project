const express = require("express");
const router = express.Router();
const { getBanners, getBannerByCategory } = require("../controllers/bannerController");

// ✅ Get all banners
router.get("/", getBanners);

// ✅ Get banner by category, subcategory, or product name
router.get("/:categoryName", getBannerByCategory);

module.exports = router;

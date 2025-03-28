// routes/categories.js
const express = require("express");
const router = express.Router();
const { getCategories } = require("../controllers/categoryController");

// ✅ Route to get categories with subcategories and products
router.get("/", getCategories);

module.exports = router;

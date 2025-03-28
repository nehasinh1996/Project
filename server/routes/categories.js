const express = require("express");
const router = express.Router();
const { getCategories } = require("../controllers/productController");

// ✅ GET: Fetch all categories
router.get("/", getCategories);

module.exports = router;

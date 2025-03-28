const express = require("express");
const router = express.Router();
const { getProductById } = require("../controllers/productController");

// ✅ GET: Fetch product by ID
router.get("/:productId", getProductById);

module.exports = router;

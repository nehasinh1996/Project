const express = require("express");
const router = express.Router();
const { getProductById, getAllProducts } = require("../controllers/productController");

// ✅ GET: Fetch all products
router.get("/", getAllProducts);

// ✅ GET: Fetch product by ID
router.get("/:productId", getProductById);

module.exports = router;

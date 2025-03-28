const express = require("express");
const router = express.Router();
const { getAllCategories } = require("../controllers/categoryController");

// ✅ GET: Fetch all categories
router.get("/", getAllCategories);

module.exports = router;

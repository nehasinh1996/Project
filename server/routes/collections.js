const express = require("express");
const { getCollections } = require("../controllers/collectionsController");

const router = express.Router();

router.get("/", getCollections);

module.exports = router; // ✅ Make sure it's `router`, not something else

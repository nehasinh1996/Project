const express = require("express");
const { getOffers } = require("../controllers/offersController");

const router = express.Router();
router.get("/", getOffers);

module.exports = router;

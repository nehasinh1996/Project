const express = require("express");
const { getCarouselImages } = require("../controllers/carouselController");

const router = express.Router();
router.get("/", getCarouselImages);

module.exports = router;

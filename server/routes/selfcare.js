const express = require("express");
const router = express.Router();
const { getSelfCareItems } = require("../controllers/selfcareController");

router.get("/", getSelfCareItems);

module.exports = router;

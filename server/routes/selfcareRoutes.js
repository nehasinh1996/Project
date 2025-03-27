const express = require("express");
const { getSelfcareCollections } = require("../controllers/selfcareController");

const router = express.Router();

router.get("/collections", getSelfcareCollections);

module.exports = router;

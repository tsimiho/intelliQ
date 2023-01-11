const express = require("express");
const router = express.Router();

const { getSessionanswers } = require("../controllers/getsessionanswers");

router.route("/:questionnaireID/:session").get(getSessionanswers);

module.exports = router;

const express = require("express");
const router = express.Router();

const { getSessionanswers } = require("../controllers/getsessionanswers");

router.route("/:questionnaireID/:sessions").get(getSessionanswers);

module.exports = router;

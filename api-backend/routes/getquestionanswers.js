const express = require("express");
const router = express.Router();

const { getquestionanswers } = require("../controllers/getquestionanswers");

router.route("/:questionnaireID/:questionID").get(getquestionanswers);

module.exports = router;

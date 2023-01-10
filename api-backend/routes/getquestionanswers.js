const express = require("express");
const router = express.Router();

const { getQuestionnaire } = require("../controllers/getquestionanswers");

router.route("/:questionnaireID/:questionID").get(getQuestionanswers);

module.exports = router;

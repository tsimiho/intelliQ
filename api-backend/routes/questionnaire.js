const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");

const { getQuestionnaire } = require("../controllers/questionnaire");

router.route("/:questionnaireID").get(getQuestionnaire);
router.route("/").get(badreq);

module.exports = router;
